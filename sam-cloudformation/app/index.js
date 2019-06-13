exports.handler = async (event, context) => ({
  statusCode: 200,
  body: `oh hai there ${event.queryStringParameters.name}`
})
