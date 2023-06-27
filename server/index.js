const winston = require('winston')
const express = require('express')
const app = express()
const helmet = require('helmet')
const joi = require("joi")
const mongoose = require('mongoose')
const shortid = require('shortid')
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
const schema = joi.object({
    // url: joi.uri().requried()
})
const urlschema = mongoose.model( 'url', new mongoose.Schema({
    longURL: String,
    shortURL: String,
    date: {
        type: String,
        default: Date.now
    }
}))
app.post('/url', async(req, res)=>{
    // const { error } = schema.validate(req.body.urlgotten)
    // if(error) return res.send()
    var shortURL = shortid.generate()
    var longURL = req.body.urlgotten
    let uri = new urlschema({
        longURL: longURL,
        shortURL: shortURL
    })
    const result = uri.save()

    res.send(result)

})
const port = process.env.PORT || 3000
winston.add(new winston.transports.File({filename: 'logfile.log' }))
const dburi = "mongodb://localhost/27017"
mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(console.log('Connected to mongodb'))
    .then(winston.info('Connected to mongodb'))

app.listen(port, ()=>{
    winston.info(`server running on port ${port}`)
    console.log(`server running on port ${port}`)
})

