const express  = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const  GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const app = express();

app.use(bodyParser.urlencoded( {extended : true }));
app.set('view engine','ejs');
app.use(express.static('public'));
app.listen(3000,function(){
  console.log("Server started successfully at port number 3000");
});

app.get('/',function(req,res){
  res.render('signUp');
});
