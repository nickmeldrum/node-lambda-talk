const { DynamoDB } = require('aws-sdk')

exports.handler = async event =>  {
  const id = event.pathParameters.id
  console.log('APP-LOG', 'GET Profile', id)

  const dynamo = new DynamoDB()
  const candidateItem = await dynamo.getItem({
    Key: {
      "Name": { S: id }, 
    }, 
    TableName: process.env.CANDIDATES_TABLE,
  }).promise()

  const candidate = DynamoDB.Converter.unmarshall(candidateItem.Item)

  return {
    "statusCode": 200,
    "headers": {},
    "body": JSON.stringify(candidate),
    "isBase64Encoded": false
  }
}
