const express = require('express')
const app = express()
const helmet = require('helmet')
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
("./startups/logging")()

app.use('/routes/url.js', url)


//read.md added url route, working on redirect, logging now better
