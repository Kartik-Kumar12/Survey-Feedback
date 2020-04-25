// https://shielded-fjord-49585.herokuapp.com



// GOOGLE
//
// 
const keys = require('./config/keys');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const cookieSession = require('cookie-session');

app.use( cookieSession ({
  maxAge : 10*24*60*60*1000,
  keys : [keys.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
const mongoose = require('mongoose');

mongoose.connect(keys.MONGO_URI+"surveyfeedbackDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const userSchema = new mongoose.Schema({
   name : String,
   googleId: String,
   email: String,

});
mongoose.model('User',userSchema);
// require('./services/passport');
require('./services/PASSPORT');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully at port number 3000");
});
app.get('/', function(req, res) {
  res.render('signUp');
});
