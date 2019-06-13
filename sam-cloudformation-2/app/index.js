exports.handler = async (event, context) => {
	console.log('NICK', event)
  return ({ statusCode: 200, body: `oh heLLOOOOO there ${event.queryStringParameters.name}` })
}
