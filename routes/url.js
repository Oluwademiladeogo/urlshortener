const validURL = require('valid-url')
const express = require('express')
const router = express.Router()
const shortid = require('shortid')
const { urlschema } = require('../models/url')
const winston = require('winston')
//logic: use base url if valid else send err message, check if url gotten from user is valid else send error
//if user url isvalid, check if its in db, i.e if someone had generated a short url from that previously then send to client. 
//if not create shorturl by linking base and shortcode. then write to db and send 

//#TODO SET A TIMER. Timer for objects in database not accessed for some time to know when they delete or self destruct
//templating and ejs so frontend for redirect page and better frontend for initial page
//using redirect to a website with a variable stored in backend
//calling a variable outside  of an express.get function
//what does the coverage folder do in my backend code node.js
//why do we need mongoose sessions in node code
//what express async errors do

router.post('/', async(req, res)=>{
    //getting the url from the user
    var longURL = req.body.urlgotten
    //base url is the site you want to attach the short parameters to. e.g bit.ly
    const baseURL = 'http://localhost:3000'
    if(!validURL.isUri(baseURL)) return res.status(401).send('Invalid baseURL')
    //todo, check if the url gotten from user is valid
    //we dont want to be shortening links that are broken or malicious
    //if true, continue
    if(validURL.isUri(longURL)){
        //avoiding too many if blocks 
        try{
            let url = await urlschema.findOne({longURL})
            if(url) return res.send(url)
            //if not continue
            var shortCode = shortid.generate()
            shortURL = baseURL + '/' + shortCode
            let urlCode = new urlschema({
                longURL: longURL,
                shortURL: shortURL,
                shortCode: shortCode,
                Date: new Date(),
                new : true
            })
            urlCode.save()
            const result = await urlschema.findOne({shortURL}).select("shortURL -_id")
        
            res.send(result)
        
        }
        catch(ex){
                console.log(ex)
                winston.error('error message', ex)
                res.status(500).send('Internal server error')
        }
    }

    else return res.status(401).send('Invalid longURL')
    
})
module.exports = router