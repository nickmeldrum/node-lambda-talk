const { DynamoDB } = require('aws-sdk')

exports.handler = async event =>  {
	const Key = event.Records[0].s3.object.key
	console.log('APP-LOG', 'CV-Uploaded', Key)

	const cvDoc = await s3.getObject({ process.env.CV_BUCKET, Key }).promise()
	const cvJson = JSON.parse(cvDoc.Body.toString())

	const dynamo = new DynamoDB()
	await dynamo.putItem({
		Item: {
			"Name": { S: cvJson.name }, 
			"Skills": { S: cvJson.skills },
		}, 
		TableName: process.env.CANDIDATES_TABLE,
	}).promise()
}
