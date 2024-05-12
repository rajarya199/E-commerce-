const express=require('express')
const { postCategory, categoryList, categoryDetails } = require('../controllers/categoryController')
const router=express.Router()

router.post('/postcategory',postCategory)
router.get('/categorylist',categoryList)
router.get('/categorydetails/:id',categoryDetails)
module.exports=router