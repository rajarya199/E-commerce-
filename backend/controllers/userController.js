const User = require("../models/userModel");
//register user
exports.postUser = async (req, res) => {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    user=await user.save()
    if(!user){
        return res.status(400).json({error:'unablr to create an account'})
    }
    res.send(user)
}