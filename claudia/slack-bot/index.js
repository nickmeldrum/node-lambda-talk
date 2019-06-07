const botBuilder = require('claudia-bot-builder')

module.exports = botBuilder(request => `you said: ${request.text}`)
