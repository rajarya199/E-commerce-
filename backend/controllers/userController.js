const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/setEmail");
const jwt=require('jsonwebtoken') //authentication

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

//signin 
exports.signIn=async(req,res)=>{
  const {email,password}=req.body 
  //check email is register/not
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(503)
      .json({
        error:
          "sorry,the email you provided is not found in our system ,register first and try again" });
  }
  //if email found check password
  if(!user.authenticate(password)){
    return res.status(400).json({ error: "email and password doesnot match" });
  }  
  //check if user is verified or not
  if (!user.isVerified) {
    return res.status(400).json({ error: "verify email first to continue" });
  }
  //generate token with user id and jwt secret
  const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
    //store token in the cookie
    res.cookie("mycookie", token, { expire: Date.now()+ 99999 });
     //return user information to frontend
  const { _id, name, role } = user;
  return res.json({ token, user: { name, role, email, _id } });
  //to acess name--> .user.name
  
}

//forget password
exports.forgetpassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  //check mail of user
  if (!user) {
    return res
      .status(403)
      .json({
        error:
          "sorry,the email you provided is not found in our system ,register first and try again",
      });
  }
  //generate new token
  let token = new Token({
    token: crypto.randomBytes(16).toString("hex"),
    userId: user._id,
  });
  token = await token.save();

  if (!token) {
    return res.status(400).json({ error: "failed to create a token" });
  }
  //send email process
  sendEmail({
    from: "no-reply@ecommerce.com",
    to: user.email,
    subject: "Password reset link",
    text: `hello,\n\n please reset your password by click in the below link:\n\n
  http:\/\/${req.headers.host}\/api\/resetpassword\/${token.token}`,
    //http:localhost:8000/api/resetpassword/3457777
  });
  res.json({ messsage: "password reset has beeen sent successfully" });
};

//
// reset  password
exports.resetPassword = async(req, res) => {
  //find the valid token
  let token= await Token.findOne({token:req.params.token})

  if (!token) {
    return res
      .status(400)
      .json({ error: "invalid token or token may have expired" });
  }
  //if we found the valid token then find the valid user for that token
  let user = await User.findOne({ _id: token.userId });
  if (!user) {
    return res
      .status(400)
      .json({ error: "we are unable to find valid user for this token" });
  }
  //reset the password
  user.password = req.body.password;
  user = await user.save();
  if (!user) {
    return res.status(500).json({ error: "failed to reset password" });
  }
  res.json({
    message: "password has been reset successfully ,login to continue",
  });
};

exports.userList=async(req,res)=>{
  const user= await User.find()
  .select('-hashed_password')
// '-' for not to show
.select("-salt")
if(!user){
  return res.status(400).json({error:'something went wrong'})

}
res.send(user)
}
//user details
exports.userDetails=async(req,res)=>{
  const user=await User.findById(req.params.id)
  .select('-hashed_password')
  .select('-salt')
  if(!user){
    return res.status(400).json({error:'something went wrong'})
  
  }
  res.send(user)
  
}

//signout
exports.signOut=(req,res)=>{
  res.clearCookie('mycookie')
  res.json({message:'signout sucessfully'})
}