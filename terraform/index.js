exports.handler = async (event, context) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
  body: `oh hai ${event.queryStringParameters.name}`
})
