const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const winston = require(winston)
const { urlschema } = require('../models/url')
router.get("/:codeoutput", (req, res, next)=>{
    try{
    const url = urlschema.findOne({
        shortcode: req.params.codeoutput
    })
    if(!url) return res.status(404).send("URL not found")
    //if url found continue
    return res.redirect(url.longURL)
}
    catch(ex){
        res.status(500).send('Internal server error')
        winston.error('Exception: ', ex)
    }
})
