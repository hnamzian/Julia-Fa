const winston = require('winston')
const express = require('express')
const app = express()
const path = require('path')

process.env.NODE_CONFIG_DIR = path.join(__dirname, './config')

require('./startup/logging.js')()
require('./startup/config.js')()
require('./startup/events')()
require('./startup/db.js')()

app.use(express.static(path.join(__dirname, '../dist/transfer')))

app.listen(3000, () => {
    winston.debug('server is running on port 3000')
})
