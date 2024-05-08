const express=require('express')
const { postUser, postEmailConfirmation, signIn, forgetpassword } = require('../controllers/userController')
const router=express.Router()

router.post('/register',postUser)
router.put('/confirmation/:token',postEmailConfirmation)
router.post('/signin',signIn)
router.post('/forgetpassword',forgetpassword)
module.exports=router 