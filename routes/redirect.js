const express = require("express");
const router = express.Router();
const winston = require("winston");
const { urlschema } = require("../models/url");
router.get("/", async (req, res) => {
  try {
    const shortURL = "https://urlshortener-lake.vercel.app/api?got=" + req.query.got;
    const url = await urlschema.findOne({
      shortURL: shortURL,
    });
    if(!url) return res.status(401).send("../public/error1.html")
    //if url found continue
    return res.redirect(url.longURL);
  } catch (ex) {
    res.status(500).sendFile("../public/error.html");
    winston.error("Exception: ", ex);
  }
});
module.exports = router;
