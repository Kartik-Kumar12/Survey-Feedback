const keys = require('./config/keys');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const cookieSession = require('cookie-session');


//MIDDLEWARES TO HANDLE INCOMING REQUEST BEFORE PASSING TO ROUTE HANDLERS
app.use(cookieSession({
  maxAge: 10 * 24 * 60 * 60 * 1000,
  keys: [keys.COOKIE_KEY]
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === "production"){
  // EXPRESS WILL SERVE PRODUCTION STATIC FILES LIKE CSS AND JS
  app.use(express.static('client/build'));

// EXPRESS WILL SERVE INDEX.HTML FILE IF IT DO NOT RECOGNIZE THE routes
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


//Mongoose connection to database
mongoose.connect(keys.MONGO_URI + "surveyfeedbackDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//UserSchema for storing users
const userSchema = new mongoose.Schema({
  name: String,
  googleId: String,
  email: String,
  credits: {
    type: Number,
    default: 0
  }
});

mongoose.model('User', userSchema);
require('./services/passport');
// require('./services/newMethodPassport');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully at given port");
});
