const Document = require('../../models').document

let index = async(req,res)=>{
    // console.log(req.session)
    res.render('./Dashboard/index',)
}
let create= async(req,res)=>{
    return res.render('./Dashboard/create_doc_form')
}
let store= async(req,res)=>{

    console.log(req.files)
    try{
        const allowedExtensions = ['pdf','doc','docx','xls','xlsx','ppt','pptx','txt']
        const size=1*1024*1000
        const extension = req.files.originalname.split('.').pop()
        if(allowedExtensions.includes(extension)){
            if(req.files.size<size){
               req.body.fichier=req.files.path
               console.log(req.body)
            }else{
                req.flash('error',"telecharger un fichier de moin de 1mb")
                return res.redirect('/dashboard/add_doc')
            }
        }else{
            req.flash('error',"veiller choisir une donne extension")
            return res.redirect('/dashboard/add_doc')
        }
        
    }catch(err){
        // req.flash('error',"veiller remplir tous les champs du form")
        // return res.redirect('/dashboard/add_doc')
        console.log(err)
    }
    
    // res.json({doc})
    // // return res.redirect('/dashboard/index')
     req.flash('error',"veiller remplir tous les champs du form")
    return res.redirect('/dashboard/add_doc')
}
module.exports={
    index,create,store
}