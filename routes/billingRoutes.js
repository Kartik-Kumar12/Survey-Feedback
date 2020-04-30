const keys = require('../config/keys');
const requireLogin = require('../middleware/requireLogin');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', requireLogin ,(req, res) => {
    stripe.charges.create({
      amount: 250,
      currency: 'INR',
      source: req.body.id,
      description: 'Pay $5 for 5 credits',
    }, function(err, charge) {
          if (err)
            console.log(err);
          else {
            req.user.credits += 5;
            req.user.save(function(err){
              if(!err)
               res.send(req.user);
            });
          }
      });
   });
 }
