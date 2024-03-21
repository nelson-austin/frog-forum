const express = require("express");
const bodyParser = require('body-parser');
const mongodb = require("./db/connect");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, () => {
        console.log(`Web Server is listening at http://localhost:${port}/`);
      });
    }
  });