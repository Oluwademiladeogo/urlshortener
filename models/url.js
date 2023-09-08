const mongoose = require('mongoose')
module.exports.urlschema= mongoose.model( 'url', new mongoose.Schema({
    longURL: String,
    shortURL: String,
    shortcode: String,
    date: {
        type: String,
        default: Date.now
    }
}))