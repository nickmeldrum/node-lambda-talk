const { DynamoDB, SES } = require('aws-sdk')

exports.handler = async event =>  {
	const dynamodbEvent = event.Records[0].dynamodb
	console.log('APP-LOG', 'EVENT INPUT', dynamodbEvent)

  const candidate = DynamoDB.Converter.unmarshall(dynamodbEvent.NewImage)

	const ses = new SES()

	const params = {
		Destination: {
			ToAddresses: [ 'nick@nickmeldrum.com', ]
		},
		Message: {
			Body: {
				Text: {
					Charset: "UTF-8",
					Data:
`
Welcome to the serverless recruiter app ${candidate.Name}!
We have set your skills to be '${candidate.Skills}'.
We will get you a great job real soon now.
`
				}
			},
			Subject: {
				Charset: 'UTF-8',
				Data: `Welcome ${candidate.Name} to the best recruiter EVAR!`
			}
		},
		Source: 'nick@deliverist.co.uk',
	};
	await ses.sendEmail(params).promise()
}
