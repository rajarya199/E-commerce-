const express=require('express')
const { postCategory, categoryList } = require('../controllers/categoryController')
const router=express.Router()

router.post('/postcategory',postCategory)
router.get('/categorylist',categoryList)
module.exports=router