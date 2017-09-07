const path = require("path");
const PORT = process.env.PORT || 5000;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// body parser Any type of Http req
// goes through here that why used!!!

app.use(bodyParser.json);

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
