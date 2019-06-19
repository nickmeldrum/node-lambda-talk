const cdk = require("@aws-cdk/cdk")
const iam = require('@aws-cdk/aws-iam')
const apigateway = require("@aws-cdk/aws-apigateway")
const lambda = require("@aws-cdk/aws-lambda")
const eventSources = require("@aws-cdk/aws-lambda-event-sources")
const s3 = require("@aws-cdk/aws-s3")
const dynamodb = require("@aws-cdk/aws-dynamodb")
const ses = require("@aws-cdk/aws-ses")

class CandidateService extends cdk.Construct {
	constructor(scope, id) {
		super(scope, id)

		const cvBucket = new s3.Bucket(this, "CVLibrary")

		const candidatesTable = new dynamodb.Table(this, 'Candidates', {
			partitionKey: { name: 'Name', type: dynamodb.AttributeType.String },
			billingMode: dynamodb.BillingMode.PayPerRequest,
			streamSpecification: dynamodb.StreamViewType.NewImage,
		});

		const candidateProfileLambda = new lambda.Function(this, "CandidateProfile", {
			runtime: lambda.Runtime.NodeJS10x,
			code: lambda.Code.directory("lambdas"),
			handler: "candidate-profile.handler",
			environment: {
				CANDIDATES_TABLE: candidatesTable.tableName
			}
		})

		const analyzeCVLambda = new lambda.Function(this, "AnalyzeCV", {
			runtime: lambda.Runtime.NodeJS10x,
			code: lambda.Code.directory("lambdas"),
			handler: "analyze-cv.handler",
			environment: {
				CV_BUCKET: cvBucket.bucketName,
				CANDIDATES_TABLE: candidatesTable.tableName
			}
		})

		const emailClerkLambda = new lambda.Function(this, "EmailClerk", {
			runtime: lambda.Runtime.NodeJS10x,
			code: lambda.Code.directory("lambdas"),
			handler: "email-clerk.handler",
			environment: {
				CANDIDATES_TABLE: candidatesTable.tableName
			}
		})

		cvBucket.grantReadWrite(analyzeCVLambda)
		candidatesTable.grantReadWriteData(analyzeCVLambda.role)
		candidatesTable.grantReadWriteData(emailClerkLambda.role)
		candidatesTable.grantReadData(candidateProfileLambda.role)

		analyzeCVLambda.addEventSource(new eventSources.S3EventSource(cvBucket, {
			events: [s3.EventType.ObjectCreated],
		}))

		emailClerkLambda.addEventSource(new eventSources.DynamoEventSource(candidatesTable, {
			startingPosition: "LATEST",
		}))

		emailClerkLambda.addToRolePolicy(new iam.PolicyStatement()
			 .addResource('*')
			 .addAction('ses:*'))

		const api = new apigateway.RestApi(this, "CandidateApi", {
			restApiName: "Candidate API",
			description: "Candidate access to their own profile"
		})

		const rootLambdaIntegration = new apigateway.LambdaIntegration(candidateProfileLambda, {
			requestTemplates: { "application/json": '{ "statusCode": "200" }' }
		})

		api.root.addMethod("GET", rootLambdaIntegration)

		const profile = api.root.addResource("{id}")

		const getCandidateProfileLambdaIntegration = new apigateway.LambdaIntegration(candidateProfileLambda)

		profile.addMethod("GET", getCandidateProfileLambdaIntegration)
	}
}

module.exports = { CandidateService }
