const path = require("path");
const PORT = process.env.PORT || 5000;
const express = require("express");
const keys = require("./config/keys");

// const { MongoClient, ObjectID } = require("mongodb");
// var obj = new ObjectID();
// const db = require('./db/db');
const mongoose = require("mongoose");
// const URL = keys.localMongoURL;

const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
require("./models/User");
require("./models/Survey");
require("./services/passport");

// These lines use for local Mongodb
// db.connect(URL, (err) => {
//   if (err) {
//     console.log('Unable to connect to Mongo.')
//     process.exit(1)
//   }
// });

// MongoClient.connect(URL, (err, db) => {
//   if (err) return;
//   const collection = db.collection("foods");
//   collection.insert({ name: "taco", tasty: true }, (err, result) => {
//     collection.find({ name: "taco" }).toArray((err, docs) => {
//       console.log(docs);
//     });
//     db.collection("foods").count((err, count) => {
//       if (err) throw err;

//       console.log("Total Rows: " + count);
//     });
//   });
//    delete many records "DeleteMany()"
//    delete one records "DeleteOne()"
//    find one and update record "findOneAndUpdate()"
//    find delete records "findOndAndDelete()"
//    db.collection('Users').insertOne({
//      name: 'Rizwan',
//      age: 24,
//      location: 'Islamabad'
//    },(err, result) => {
//         if(err){
//           return 'Unable to insert the Users data!';
//         }
//         console.log(JSON.stringify(result.ops[0]._id.getTimeStamp(), undefined, 2));
//    });
//    db.close();
// });
mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI);

const app = express();

// body parser Any type of Http req
// goes through here that why used!!!

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cookieSession
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Calling Routes
authRoutes(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

// prod/ dev config

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js or main.css files
  app.use(express.static("client/build"));

  // Express will server up the index.html file
  // if it doesn't recognize the route
  app.get("*", (req, res) => {
    app.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
}

app.listen(PORT, err => {
  if (err) return console.log(err);
  return console.log(`App Listening at http://localhost:${PORT}`);
});
