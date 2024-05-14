const multer=require('multer')
const fs=require('fs') //file system -to identify folder ,directory where to upload
const path=require('path')//  to read image name ,extension 

//where to stored -diskstorage
const storage=multer.diskStorage({
    //cb-callback fn
    destination:(req,file,cb)=>{
        let fileDestination='public/uploads/'
        //check if directory exist 
        if(!fs.existsSync(fileDestination)){
            fs.mkdirSync(fileDestination,{recursive:true})
            cb(null,fileDestination)
        }
        else{
            cb(null,fileDestination)
        }
    },
    filename:(req,file,cb)=>{
        let filename=path.basename(file.originalname,path.extname(file.originalname))
        //path.basename('images/foo/abc.jpg',.jpg) 
        //abc
        // it give abc (filename only)
        let ext=path.extname(file.originalname)
        //.jpg 
        cb(null,filename+'_'+Date.now()+ext)
    }

})

let imageFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|png|jpeg|svg|jfif|gif|JPG|PNG|JPEG|SVG|JFIF|GIF)$/)){
        return cb(new Error('You can upload image file only'),false)
    }
    else{
        cb(null,true)
    }
}

const upload=multer({
    storage:storage,
    fileFilter:imageFilter,
    limits:{
        fileSize:3000000 //3mb
    }
})
module.exports=upload 