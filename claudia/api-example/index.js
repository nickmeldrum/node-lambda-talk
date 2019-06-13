const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()

api.get('/hello', request => `oh hai ${request.queryString.name}`)
module.exports = api
