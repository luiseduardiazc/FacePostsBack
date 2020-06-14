require('dotenv/config')

const aws = require('./components/aws')
const server = require('./components/server')
const mongo = require('./components/mongo')
const config = {
    aws,
    server,
    mongo
}

module.exports = config 