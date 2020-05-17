exports.isLoggedIn = (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error : " You must logged in !! "});

  next();

}
exports.hasCredits = (req,res,next) => {
  if( !req.user.credits)
       return res.status(403).send({ error : "Oops !! Not enough credits !! "});

  next();
}
