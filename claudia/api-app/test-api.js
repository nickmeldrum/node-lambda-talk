const request = require('./request')
const claudiaConfig = require('./claudia.json')

const testUrl = `https://${claudiaConfig.api.id}.execute-api.${claudiaConfig.lambda.region}.amazonaws.com/latest/hello?name=gerry`

;(async () => {
  console.log(`GETTING:  ${testUrl}`)
  const response = await request(testUrl, {})
  console.log(`RESPONSE: ${response.body}`)
})()

