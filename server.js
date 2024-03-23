const express = require("express");
const mongodb = require("./db/connect");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

mongodb.initDb((err, mongodb) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, () => {
        console.log(`Web Server is listening at http://localhost:${port}/`);
      });
    }
  });

app.use(express.json());