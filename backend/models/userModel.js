const mongoose=require('mongoose')
const uuidv1=require('uuidv1') //generrate random string
const crypto=require('crypto') //hasing

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true

    },
    role:{
        type:Number,
        default:0
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:String,  //to store uuidv1 generated string
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
//virtual field
userSchema.virtual('password')

.set(function(password){
    this._password=password 
    this.salt=uuidv1() //random generated 
    this.hashed_password=this.encryptPassword(password)
})
.get( function(){
    return this._password
})
//defn method encryptPassword
userSchema.methods={
    encryptPassword:function(password){
        if(!password) return ''
        try{
            return crypto 
            .Hmac('sha1',this.salt) //algo to encrypt
            .update(password)
            .digest('hex') //in hex format
        }
        catch(err){
            return err
        }
        
    },
    authenticate:function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    }
}

module.exports=mongoose.model('User',userSchema)