const{check,validationResult} =require('express-validator')

exports.categoryValidation=[
    check('category_name','category name is required').notEmpty()
    .isLength({min:3}).withMessage('category must be of at least 3 character')

]
exports.userValidation=[
    check('name',"name is required ").notEmpty()
    .isLength({min:3})
    .withMessage('name must be of at least 3 character'),
    check('email','email is required').notEmpty()
    .isEmail().withMessage('email format incorrect'),
]

exports.passwordValidation=[
    check('password','password is required').notEmpty()
    .matches(/[a-z]/).withMessage('password must contain atleast one lowercase letter')
    .matches(/[A-Z]/).withMessage('password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('password must contain at least one numeric value')
    .matches(/[@#$_?!]/).withMessage('passord must contain at least one special character')
    .isLength({min:8}).withMessage('password must be minium of 8 character')
]
//next middleware -if correct then push to next,coming fn 
exports.validation=(req,res,next)=>{
    const errors=validationResult(req)
    if(errors.isEmpty()){
        //no error next
        next()
    }
    else{
        //errors.array()-multiple errors ,[0]-index0 ist error at a time
        return res.status(400).json({error:errors.array()[0].msg})
    }
}