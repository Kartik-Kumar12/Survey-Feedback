const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const mongoose = require('mongoose');
const User = mongoose.model('User')
const findOrCreate = require('mongoose-findorcreate');


passport.serializeUser((user,done)=>{
  done(null,user.id);
});
passport.deserializeUser((id,done) => {
  User.findById(id , (err,user) => {
    done(err,user);
  })
})

passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
  }
))
