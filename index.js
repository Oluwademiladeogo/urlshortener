const express = require("express");
const app = express();
const mongoose = require("mongoose");
const winston = require("winston");
const helmet = require("helmet");
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/", require("./routes/redirect"));
app.use("/url", require("./routes/url"));
// ("./startups/loghandler")()
const port = process.env.PORT || 3000;
winston.add(new winston.transports.File({ filename: "logfile.log" }));
const dburi = process.env.MONGODB_URI;
mongoose
  .connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //   .then(console.log("Connected to mongodb"))
  .then(winston.info("Connected to mongodb"));

app.listen(port, () => {
  winston.info(`server running on port ${port}`);
  //   console.log(`server running on port ${port}`);
});
