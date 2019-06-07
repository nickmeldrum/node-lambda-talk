const got = require('got')
const tunnel = require('tunnel')
const Url = require('url-parse')

module.exports = async (url, options) => {
	if (process.env.http_proxy) {
		const proxyUrl = new Url(process.env.http_proxy)
		options.agent = tunnel.httpsOverHttp({
      proxy: {
        host: proxyUrl.hostname,
        port: proxyUrl.port,
      }
		})
	}
	return got(url, options)
}
