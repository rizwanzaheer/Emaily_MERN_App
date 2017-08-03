const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
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

app.listen(PORT, (err) => {
  if(err) return console.log(err);
  return console.log(`App Listening at http://localhost:${PORT}`);
});
