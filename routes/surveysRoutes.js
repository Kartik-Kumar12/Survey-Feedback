const {isLoggedIn,hasCredits} = require('../middleware/requireUserCredentials');
const sendEmail = require('../services/Mailer');
const emailTemplate = require('../templates/emailTemplate');
const mongoose = require('mongoose');
const lodash = require("lodash");
const Path = require("path-parser");
const {URL} = require('url');
const Survey = mongoose.model('Survey');
module.exports = (app) => {

  app.get('/api/surveys/:surveyId/:choice', (req,res) => {
   if(req.params.choice == 'yes')
    res.send("<h1>It's great day to have feedback from  you</h1>");
   else
   res.send("<h1>We are really sorry for what you experinced , we will keep in mind next time</h1>");
  });
  
 app.get('/api/surveys',isLoggedIn,async(req,res) => {
   const surveys = await Survey.find({ _user : req.user } ,{ _id : 0,recipients : 0,_user :0 }).sort({dateSent:-1});
   res.send(surveys);
  });
 app.post('/api/surveys',isLoggedIn,hasCredits, async(req,res) => {
    const { title,subject,body,recipients} = req.body;
    console.log(req.body);
    const survey = new Survey ({
      //Since key value pairs are same
      title,
      subject,
      body,
      recipients: recipients.split(',').map( email => ({ email: email.trim() })),
      _user : req.user.id,
      dateSent : new Date().toLocaleDateString(),
    });
    try {
      const newMail = new sendEmail(survey,emailTemplate(survey));
      await newMail.sendRequest();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    }
    catch (err) {
      res.status(422).send(err);
    }
  });

app.post('/api/surveys/webhooks', (req,res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    const events = lodash.chain(req.body)
          .map(({email,url}) => {
            const match = p.test(new URL(url).pathname);
            if (match){
               match.email = email;
               return match;
             }
          })
          .compact()
          .uniqBy('email','surveyId')
          .each(({email,surveyId,choice}) => {
            Survey.updateOne(
                { _id : surveyId ,
                  recipients : {
                     $elemMatch : { email : email , responded : false }
                   }
                },
                {
                  $inc : {[choice] : 1} ,
                  $set : { 'recipients.$.responded' : true , lastResponded : new Date().toLocaleDateString() },
                }
              ).exec();
          })
          .value();

    // SIMPLE METHOD OF EXTRATING PATH AND FINDING SURVEYID AND CHOICE
    // const events = req.body.map(({email,url}) => {
    //   const pathname = new URL(url).pathname;
    //   const p = new Path('/api/surveys/:surveyId/:choice');
    //   const match = p.test(pathname);
    //   if (match)
    //   {
    //      match.email = email;
    //      return match;
    //    }
    // });
    // const compactEvents = lodash.compact(events);
    // const uniqueEvents = lodash.uniqBy(compactEvents,'email','surveyId');


  });
}
