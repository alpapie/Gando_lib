module.exports= (req,file,cb)=>{
    const allowedExtensions = ['pdf','doc','docx','xls','xlsx','ppt','pptx','txt']
    const size=20*1024*1000
    const extension = file.originalname.split('.').pop()
    if(allowedExtensions.includes(extension)){
        cb(null,true)
        if(file.size<size){
            cb(null,true)
        }else{
            cb(null,false)
        }
    }else{
        cb(new Error('extension non autorisée'))
    }
}
