module.exports = function(){
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
})}