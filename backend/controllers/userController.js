const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/setEmail");
//register user
exports.postUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // check if email already registered
  User.findOne({ email: user.email }).then(async (data) => {
    if (data) {
      return res
        .status(400)
        .json({ error: "email is already registered try with new one" });
    } else {
      user = await user.save();
      if (!user) {
        return res.status(400).json({ error: "unablr to create an account" });
      }
      //create  token and save it to the tiken model
      let token = new Token({
        token: crypto.randomBytes(16).toString("hex"),
        userId: user._id,
      })
      token = await token.save();
      if (!token) {
        return res.status(400).json({ error: "failed to create a token" });
      }
      //send email
      sendEmail({
        from: "no-reply@ecommerce.com",
        to: user.email,
        subject: "Email verification link",
        text: `hello,\n\n please verify your email by click in the below link:\n\n,
          http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}`,
        //http:localhost:8000/api/confirmation/3457777
      })

      res.send(user);
    }
  })
}

//post email confirmation
exports.postEmailConfirmation = (req, res) => {
  //at first find the valid/matching token
  Token.findOne({ token: req.params.token })
  .then((token) => {
    if (!token) {
      return res
        .status(400)
        .json({ error: "invalid token or token may have expired" });
    }
      //if found valid then find the valid user for that token
      User.findOne({ _id: token.userId })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            error: "we are unable to find the valid user for this token",
          })
        }
        // check if user is already verified or not
        if (user.isVerified) {
          return res
            .status(400)
            .json({ error: "email is already verified,please login to continue" });
        }
        //save verified user
        user.isVerified=true;
        user.save()
        .then(user=>{
          if(!user){
            return res
            .status(400)
            .json({ error: "failed to verify the email" });
          }
          res.json({message:'congrats,your email has been verified successfully'})  
        })
        .catch((err) => {
          return res.status(400).json({ error: err });
        })
      })

      .catch((err) => {
        return res.status(400).json({ error: err });
      })
  })
 .catch((err) => {
  return res.status(400).json({ error: err });
});
};
