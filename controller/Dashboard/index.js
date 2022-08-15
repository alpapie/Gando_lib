const Document = require('../../models').document
const Auteur = require('../../models').auteur
const Ecrit = require('../../models').ecrit
const category = require('../../models').category
const {Op}=require('sequelize')
const path = require('path')
var Api2Pdf = require('api2pdf');   
// const PDFNetimg=require('@pdftron/pdfnet-node')


const fs = require('fs');


var a2pClient = new Api2Pdf('be6b5d7a-6be6-4cf2-bfc4-b5977426fb7e');


//cette fonction permet de recupere l'ensemble des categories similaire a un document donnee
let categorysimilaire= async (categorise)=>{
    let simdoc=[]
    //on recupere tout les documents similaire 
    for(let i=0;i<categorise.length;i++){
        let doc= await Document.findAll({
            where:{category:
            {[Op.like]:'%'+categorise[i]+'%'}
            },
            limit:3,
            raw:true,
        })
        simdoc.push(doc[0])
    }
    return await getauteur(simdoc)
}

//fonction pour recuperer les auteur du document
let getauteur= async (documents)=>{

        //on renvoie un message d'erreur sur la page d'acceuil
        for(let i=0;i<documents.length;i++){
            //on recupere les auteurs du document
            documents[i].auteur= await Ecrit.findAll({
                where:{ doc_id:documents[i].id},
                include:[{model:Auteur}],
                raw:true,
            })
        }
        return documents
}


//la page d'acceuil du dashboard
let index = async(req,res)=>{
    //on recuper le user a l'aide du middleware auth qui passe les donne du user dans la requete
    let userId=req.auth.user.id

    //on recupere les documents du l'user
    let documents= await Document.findAll({
        where:{ user_id:userId},
        offset:10,
        limit:10,
        raw:true,
    })
    if (documents.length >0){
       let docWithAut=await getauteur(documents)
       console.log(docWithAut)
        return  res.render('./Dashboard/index',{documents:docWithAut})
    
    }
   return  res.render('./Dashboard/index')
}

//formulaire de cration de document 
let create= async(req,res)=>{
    //on recupere les catgories
    let categorys= await category.findAll({
        attributes: ['intituler'],
        raw:true,
    }).then(categorys => { return categorys})
    //on recupere le user dans la session
    let user=req.auth.user

    //les precepente redirection
    let data=null
    //ceux ci n'est pas obligatoire car les donne sont envoyer sur le res.locals 
    data=req.session.data
    //on supprime la session data
    req.session.data=undefined
    return res.render('./Dashboard/create_doc_form',{categorys,user,data})
}


//formulaire de stockage du document
let store= async(req,res)=>{
    //les donnees du formulaire
    let data=req.body
    //les category sont en format array on fait un join avec ,
    data.category=data.category.join(',')
    // console.log(req.file)
    try{
        //on verify le size et le type du fichier
        const allowedExtensions = ['pdf','doc','docx','xls','xlsx','ppt','pptx','txt']
        const size=20*1024*1000
        //on recupere la dernier valeur
        const extension = req.file.originalname.split('.').pop()
        if(allowedExtensions.includes(extension) && req.file.size<size){
            data.size=req.file.size/(1024*1000)
            //le chemin du file
            let pathfile=req.file.path
            data.fichier=pathfile

            // a2pClient.libreOfficeThumbnail(pathfile)
            //     .then((result)=> {
                   
            //         if (result.Success===false) {
            //             // data.thumb=result.thumbnail
            //               console.log("success "+result.Success)
            //         } else {
            //            data.thumb="./uploads/icon/pdf.png" 
            //         }
                  
            //     }).catch(err=>{
            //         data.thumb="./uploads/icon/pdf.png" 
            //         console.log("erreur "+err)
            //     })
                data.thumb="/icon/pdf.png" 
            //des requet async pour stocker le document dansles table document auteur et ecrit
            const document=await Document.create(data).then(async doc=>{
                const auteur= await Auteur.create(data).then(async aut=>{
                    const ecrit= await Ecrit.create({aut_id:aut.id , doc_id:doc.id})
                })
            })   
            
            //on renvoie un message de succes au index dashbord
            req.flash('success',"document enregistrer avec success")
            return res.redirect('/dashboard/index')
        }else{
            //on suprime le fichier pres enregistrer
            fs.unlink(req.file.path, (err) => {
                if (err) {
                  console.error(err)
                }
            })
            //on envoie les donnes preremplis dans le form
            req.session.data=data

            //on renvoie un message d'erreur sur le form
            req.flash('error',"veiller choisir une donne extension")
            return res.redirect('/dashboard/add_doc')
            //file removed
        }    
    }catch(err){
        console.log(err)
    }

    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error(err)
        }
    })
    //on renvoie un message d'erreur sur le form
    req.flash('error',"veiller remplir tous les champs du form")
    return res.redirect('/dashboard/add_doc')
    //file removed
}


//show le document
let show= async(req,res)=>{

    //on recupere le document
    let document= await Document.findOne({
        where:{ id:req.params.id},
        raw:true,
    })
    let categories=document.category.split(',')
    //on recupere les auteurs du document
    document=await getauteur([document])

    //doc similaire
    let simdoc= await categorysimilaire(categories)
    return res.render('./Dashboard/show_doc',{document,simdoc})

}

//Modication du document
let edit= async (req,res)=>{
    let id=req.params.id
    let document= await Document.findOne({
        where:{id:id},
        raw:true,
    })
    console.log(document)
}
module.exports={
    index,create,store,edit,show
}