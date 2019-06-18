const { SES } = require('aws-sdk')

exports.handler = async event =>  {
	const candidate = event.Records[0].dynamodb
	console.log('APP-LOG', 'CV-Analyzed', candidate)

	const ses = new aws.SES()
}
