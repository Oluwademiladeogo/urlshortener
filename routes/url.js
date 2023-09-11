const validURL = require("valid-url");
const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const { urlschema } = require("../models/url");
const winston = require("winston");
//logic: use base url if valid else send err message, check if url gotten from user is valid else send error
//if user url isvalid, check if its in db, i.e if someone had generated a short url from that previously then send to client.
//if not create shorturl by linking base and shortcode. then write to db and send

//#TODO SET A TIMER. Timer for objects in database not accessed for some time to know when they delete or self destruct

router.post("/", async (req, res) => {
  //getting the url from the user
  var longURL = req.body.urlgotten;
  const baseURL = "https://urlshortener-lake.vercel.app/";
  if (!validURL.isUri(longURL)) return res.status(401).sendFile("../public/error1.html");
  //todo, check if the url gotten from user is valid
  //we dont want to be shortening links that are broken or malicious
  //if true, continue
  if (validURL.isUri(longURL)) {
    //avoiding too many if blocks
    try {
      let url = await urlschema.findOne({ longURL });
      if (url) return res.send(url.shortURL);
      //if not continue
      var shortCode = shortid.generate();
      shortURL = baseURL + "/api?got=" + shortCode;
      let urlCode = new urlschema({
        longURL: longURL,
        shortURL: shortURL,
        Date: new Date(),
        new: true,
      });
      await urlCode.save();
      const result = await urlschema
        .findOne({ shortURL })
        .select("shortURL -_id");

      res.send(result);
    } catch (ex) {
      console.log(ex);
      winston.error("error message", ex);
      res.status(500).sendFile("../public/error.html");
    }
  } else return res.status(401).sendFile("../public/error1.html");
});
module.exports = router;
