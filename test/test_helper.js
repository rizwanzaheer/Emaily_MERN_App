const mongoose = require("mongoose");
const keys = require("../config//keys");
mongoose.connect(keys.localMongoURL);
mongoose.connection
  .once("open", () => console.log("Good to Go!"))
  .on("error", error => console.error("Error :", error));

// this is a hoook
beforeEach(done => {
  // delete all record in the users collection
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
