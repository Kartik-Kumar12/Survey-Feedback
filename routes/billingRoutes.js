const keys = require('../config/keys');
const {isLoggedIn,hasCredits} = require('../middleware/requireUserCredentials');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {

  app.post('/api/stripe', isLoggedIn ,async (req, res) => {
    await stripe.charges.create({
      amount: 500,
      currency: 'INR',
      source: req.body.id,
      description: 'Pay $5  for 5 credits',
     });
    req.user.credits+=5;
    const user = await req.user.save();
    res.send(user);
  });
 }
