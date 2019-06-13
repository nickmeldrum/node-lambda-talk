exports.handler = async (event, context) => ({
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  body: `oh hai ${event.queryStringParameters.name}`
})
