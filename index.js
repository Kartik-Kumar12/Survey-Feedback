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


//Mongoose connection to database
mongoose.connect(keys.MONGO_URI + "surveyfeedbackDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

require('./models/Users');
require('./models/Surveys');
require('./services/passport');
// require('./services/newMethodPassport');


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveysRoutes')(app);

if (process.env.NODE_ENV === "production"){
  // EXPRESS WILL SERVE PRODUCTION STATIC FILES LIKE CSS AND JS
  app.use(express.static('client/build'));

// EXPRESS WILL SERVE INDEX.HTML FILE IF IT DO NOT RECOGNIZE THE routes
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.get('/',(req,res) => {
  res.send("Hello thete");
})

app.listen(port, function() {
  console.log("Server started successfully at port number 3000");
});
