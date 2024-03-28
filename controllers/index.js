const mongodb = require("../db/connect");

function getMongoDb(name) {
  return mongodb.getDb().db("frogforum").collection(name);
}

module.exports = { getMongoDb };
