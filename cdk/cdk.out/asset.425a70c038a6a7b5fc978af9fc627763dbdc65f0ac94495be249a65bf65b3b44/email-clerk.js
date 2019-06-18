const { SES } = require('aws-sdk')

exports.handler = async event =>  {
	const candidate = event.Records[0].dynamodb.NewImage
	console.log('APP-LOG', 'CV-Analyzed', candidate)

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
				Data: 'Welcome to the best recruiter EVAR!'
			}
		},
		Source: 'nick@deliverist.co.uk',
	};
	await ses.sendEmail(params).promise()
}
