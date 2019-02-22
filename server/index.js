"use strict";
/*
// Basic express setup:
--------------------------------------------------------------
*/
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
const connector = require("./lib/data-helpers.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*
Starting Mongo Database that connects my Server to Mongo
-----------------------------------------------------------------
*/
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

// db is the mongo Database that is tweeter
  const DataHelpers = connector(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});
//No database closure because the database closes when the server shuts down
