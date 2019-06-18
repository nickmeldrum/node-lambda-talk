const cdk = require("@aws-cdk/cdk")
const apigateway = require("@aws-cdk/aws-apigateway")
const lambda = require("@aws-cdk/aws-lambda")
const s3 = require("@aws-cdk/aws-s3")

class CandidateService extends cdk.Construct {
  constructor(scope, id) {
    super(scope, id)

    const bucket = new s3.Bucket(this, "CVLibrary")

    const candidateProfileLambda = new lambda.Function(this, "CandidateProfile", {
      runtime: lambda.Runtime.NodeJS10x,
      code: lambda.Code.directory("resources"),
      handler: "candidate-profile.handler",
    })

    const analyzeCVLambda = new lambda.Function(this, "AnalyzeCV", {
      runtime: lambda.Runtime.NodeJS10x,
      code: lambda.Code.directory("resources"),
      handler: "analyze-cv.handler",
      environment: {
        BUCKET: bucket.bucketName
      }
    })

    bucket.grantReadWrite(analyzeCVLambda)

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
