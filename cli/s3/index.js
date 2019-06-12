const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const Bucket = 'nick-s3triggertest'

module.exports.handler = async (event, context) => {
	const Key = event.Records[0].s3.object.key

	const s3Object = await s3.getObject({Bucket, Key }).promise()
	const json = JSON.parse(s3Object.Body.toString())

  json.foo += 1

  await s3.putObject({
    Bucket,
    Key: Key.replace('input', 'output'),
    Body: JSON.stringify(json)
  }).promise()
}
