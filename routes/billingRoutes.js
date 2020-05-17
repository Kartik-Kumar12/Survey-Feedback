const keys = require('../config/keys');
const {isLoggedIn,hasCredits} = require('../middleware/requireUserCredentials');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  
  app.post('/api/stripe', isLoggedIn ,async (req, res) => {
    await stripe.charges.create({
      amount: 25000,
      currency: 'INR',
      source: req.body.id,
      description: 'Pay Rs250  for 5 credits',
     });
    req.user.credits+=5;
    const user = await req.user.save();
    res.send(user);
  });
 }
