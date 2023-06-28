const express = require('express')
const app = express()
const winston = require("winston")
const helmet = require('helmet')
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())

winston.add(new winston.transports.File({filename: 'logfile.log' }))
// ("./startups/logging")()
app.use('/', require('./routes/redirect'))
app.use('/url', require("./routes/url"))