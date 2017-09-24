const mongoose = require("mongoose");
const keys = require("../config//keys");

// ES6 Promise global
mongoose.Promise = global.Promise;

// this is a hoook
// before only call at one time
// to create a connection
// and run all test
before(done => {
  mongoose.connect(keys.localMongoURL);
  mongoose.connection
    .once("open", () => {
      console.log("Good to Go!");
      done();
    })
    .on("error", error => console.error("Error :", error));
});

// this is a hoook
beforeEach(done => {
  // delete all record in the users collection
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
