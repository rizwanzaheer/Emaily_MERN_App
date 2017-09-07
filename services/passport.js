const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // done func pass err, existingUser
        console.log("found");
        return done(null, existingUser);
      }
      // saving in DB
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
      console.log("New user added in DB");
    }
  )
    // if async function not run correctly then use this function comment code
    // User.findOne({ googleId: profile.id }).then(existingUser => {
    //   if (existingUser) {
    //     // done func pass err, existingUser
    //     console.log("User found!");
    //     return done(null, existingUser);
    //   } else {
    //     // saving in DB
    //     new User({ googleId: profile.id })
    //       .save()
    //       .then(user => done(null, user));
    //   }
    // });
);
