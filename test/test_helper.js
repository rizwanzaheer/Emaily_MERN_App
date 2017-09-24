const mongoose = require("mongoose");
const keys = require("../config//keys");
mongoose.connect(keys.localMongoURL);
mongoose.connection
  .once("open", () => console.log("Good to Go!"))
  .on("error", error => console.error("Error :", error));
