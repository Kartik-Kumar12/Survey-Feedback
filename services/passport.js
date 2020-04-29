const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const mongoose = require('mongoose');
const User = mongoose.model('User')

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
    callbackURL: "/auth/google/callback",
    // To deal with heroku proxy otherwise google will interpret it wrongly from https to http
    proxy: true
  },
  //Using aync and await
  async (accessToken,refreshToken,profile,done) => {
    const foundUser = await User.findOne({googleId : profile.id});
    if(foundUser)
      return done(null,foundUser);
    else{
      const user = await new User({ name : profile.displayName,googleId : profile.id});
      user.save();
      return done(null,user);
    }
  }
  // (accessToken, refreshToken, profile, done) => {
  //   User.findOne({googleId : profile.i d},function(err,foundUser){
  //     if(foundUser)
  //     {
  //       console.log(foundUser);
  //        return done(err,foundUser);
  //     }
  //    else{
  //       const user = new User({ name : profile.displayName,googleId : profile.id});
  //       user.save(function(err){
  //         if(!err)
  //          return done(err,user);
  //       });
  //     }
  //   })
  // }
))
