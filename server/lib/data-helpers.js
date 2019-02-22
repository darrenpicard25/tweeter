"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to mongo `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in mongo`db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        db.collection("tweets").find().toArray((err , tweets) => {
          if (err) {
            throw err;
          }
        callback(null, tweets.sort(sortNewestFirst));
        });

      });
    }
  };
};
