const got = require('got')
const tunnel = require('tunnel')
const claudiaConfig = require('./claudia.json')

const testUrl = `https://${claudiaConfig.api.id}.execute-api.${claudiaConfig.lambda.region}.amazonaws.com/latest/hello`

;(async () => {
  console.log(`GETTING:  ${testUrl}`)
  const response = await got(testUrl, {
    agent: tunnel.httpsOverHttp({
      proxy: {
        host: 'http.proxy.fmr.com',
        port: 8000,
      }
    })},
  )

  console.log(`RESPONSE: ${response.body}`)
})()
