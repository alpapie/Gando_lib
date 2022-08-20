const Document = require('../../models').document
const Auteur = require('../../models').auteur
const Ecrit = require('../../models').ecrit
const category = require('../../models').category
const Comment = require('../../models').commentaire
const User = require('../../models').user

const {Op, where}=require('sequelize')
const path = require('path')
let jwt=require('jsonwebtoken')
var Api2Pdf = require('api2pdf');   
// const PDFNetimg=require('@pdftron/pdfnet-node')


const fs = require('fs');
const { type } = require('os')


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

//get all comment
let getcomment= async (doc)=>{

    return await Comment.findAll({
        where:{doc_id:doc.id},
        include:[{model:User}],
        raw:true,
    })
}

//la page d'acceuil du dashboard
let index = async(req,res)=>{
    try {
        //on recuper le user a l'aide du middleware auth qui passe les donne du user dans la requete
    let userId=req.auth.user.id

    //on recupere les documents du l'user
    let documents= await Document.findAll({
        where:{ user_id:userId},
        offset:0,
        limit:20,
        raw:true,
    })
    if (documents.length >0){
       let docWithAut=await getauteur(documents)
       
        return  res.render('./Dashboard/index',{documents:docWithAut})
    
    }
   return  res.render('./Dashboard/index')
    } catch (error) {
        res.redirect('/404')
    }
    
}

//formulaire de cration de document 
let create= async(req,res)=>{
    //on recupere le user dans la session
    let user=req.auth.user

    //les precepente redirection
    let data=null
    //ceux ci n'est pas obligatoire car les donne sont envoyer sur le res.locals 
    data=req.session.data
    //on supprime la session data
    req.session.data=undefined
    return res.render('./Dashboard/create_doc_form',{user,data})
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
            data.thumb=['pdf','doc','docx','ppt','pptx','txt'].includes(extension) ?"/icon/"+extension+".png" : "/icon/file.png"
            
            //on verifie si le user connecter est ce lui qui creer le document
            data.user_id=req.auth.user.id
            //des requet async pour stocker le document dansles table document auteur et ecrit
            
            const document=await Document.create(data).then(async doc=>{
                //on recupere les auteurs du document
                if(typeof data.nom==='object' && typeof data.email==='object' && typeof data.numero=== 'object'){
                    for(let i=0;i<data.nom.length;i++){
                        await Auteur.create({
                            nom:data.nom[i],
                            email:data.email[i],
                            numero:data.numero[i],
                        }).then(async auteur=>{
                            await Ecrit.create({
                                aut_id:auteur.id,
                                doc_id:doc.id,
                            })
                        })
                    }
                }else{
                    const auteur= await Auteur.create(data).then(async aut=>{
                    const ecrit= await Ecrit.create({aut_id:aut.id , doc_id:doc.id})
                })
                }
                
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

//methode d'enregistrement des commentaire
let comment_add=async(req,res)=>{
    
    // let token =req.session.token
    // let verif=jwt.verify(token,process.env.ACCESS_TOKEN)
    // console.log(verif)
    //on recupere les donnees du form
    try {
    let comment_data=req.body
    comment_data.user_id=req.auth.user.id
    if(comment_data){
        let comment= await Comment.create(comment_data)
        //enregistrement success
        req.flash('success',"commentaire enregistrer avec success")
       return  res.redirect('back')
    }
    //on renvoie un message d'erreur sur le form car les donnees sont vide
    req.flash('error',"veiller remplir tous les champs du form")
    return res.redirect('back')
    } catch (error) {
    //on renvoie un message d'erreur sur le form car les donnees sont vide
    req.flash('error',"une erreur c'est produite")
    return res.redirect('back')
    }
}

//show le document
let show= async(req,res)=>{
try {
     //on recupere le document
    let document= await Document.findOne({
        where:{ id:req.params.id},
        raw:true,
    })
    let categories=document.category.split(',')
    //on recupere les auteurs du document
    document=await getauteur([document])
    document=document[0]
    document.comment= await getcomment(document)
    //doc similaire
    // console.log(document)
    let simdoc= await categorysimilaire(categories)
    return res.render('./Dashboard/show_doc',{document,simdoc,categories})
} catch (err) {
    return res.redirect('/404')
}
   

}

//
//form pour modif document
let edit= async (req,res)=>{
    try {
    let id=req.params.id
    let document= await Document.findOne({
        where:{id:id},
        raw:true,
    })
   document= await getauteur([document])
   return res.render('./Dashboard/edit_doc',{data:document[0]})
} catch (error) {
       return res.redirect('/404')
}
}

//methode de modification du document
let update= async(req,res)=>{
    //les donnees du formulaire
    let data=req.body
    //les category sont en format array on fait un join avec ,
    data.category ? data.category=data.category.join(','):undefined
    // console.log(req.file)

    let update_aut= async (data)=>{
        if (typeof data.nom ==='object' && typeof data.email==='object' ){
            for(let i=0;i < data.nom.length; i++){
        
                // console.log(data.aut_id[i])
                let autup= await Auteur.findOne({
                    where:{id: data.aut_id[i] },
                })
                if(autup){
                    autup.update({
                        nom:data.nom[i],
                        email:data.email[i],
                        numero:data.numero[i],
                    })
                }else{
                     Auteur.create({
                        nom:data.nom[i],
                        email:data.email[i],
                        numero:data.numero[i],
                    }).then(async aut=>{
                        Ecrit.create({aut_id:aut.id , doc_id:data.doc_id})
                    })
                }
            }
        }else{
            // console.log('autre ffd')
            const auteur= await Auteur.update(data,{where:{id:data.aut_id}})
        }
    }
    data.user_id=req.auth.user.id
     // console.log(req.file)
    try {
        
    
        //on verify le size et le type du fichier
        if(req.file){
            const allowedExtensions = ['pdf','doc','docx','xls','xlsx','ppt','pptx','txt']
            const size=20*1024*1000
            //on recupere la dernier valeur
            const extension = req.file.originalname.split('.').pop()
        
            if(allowedExtensions.includes(extension) && req.file.size<size){
                data.size=req.file.size/(1024*1000)
                //le chemin du file
                let pathfile=req.file.path
                data.fichier=pathfile
                
                data.thumb=['pdf','doc','docx','ppt','pptx','txt'].includes(extension) ?"/icon/"+extension+".png" : "/icon/file.png"

                //des requet async pour modifier le document dans les table document auteur et ecrit
                const document=await Document.findOne(data,{where:{id:data.doc_id}})
                if(pathfile){
                    //on supprime le fichier precedent
                    fs.unlink(document.fichier, (err) => {
                        if (err) {
                          console.error(err)
                        }
                    })
                }
                await document.update(data)
                update_aut(data)
                // console.log(document)
                // console.log(data)
                //on renvoie un message de succes au index dashbord
                req.flash('success',"document modifier avec success")
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
                return res.redirect('back')
                //file removed
            } 
        }else{
            update_aut(data)
            // console.log(data)
            req.flash('success',"auteur changer avec success")
            return res.redirect('/dashboard/index')
        }   
    } catch (error) {  
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error(err)
            }
        })
        //on renvoie un message d'erreur sur le form
        req.flash('error',"veiller remplir tous les champs du form")
        return res.redirect('back')
    } 
}


//methode de suppression du document
let destroy= async(req,res)=>{
    try{
        let id=req.params.id
        let document= await Document.findOne({
            where:{id:id},
            raw:true,
        })
        //on supprime les commentaire
        await Comment.destroy({
            where:{doc_id:id},
        })

        //on supprime l'ecrit et les auteurs
       await Ecrit.findAll({
            where:{doc_id:id},
            raw:true,
        }).then(async ecritAut=>{
            await Ecrit.destroy({
                where:{doc_id:id},
            })
            for(let i=0;i<ecritAut.length;i++){
                await Auteur.destroy({
                    where:{id:ecritAut[i].aut_id},
                })
            }
        })

        await Document.destroy({
                where:{id:id}
            })
        //on suprimme le fichier
        fs.unlink(document.fichier, (err) => {
            if (err) {
                console.error(err)
            }
        })
        //on renvoie un message de succes au index dashbord
        req.flash('success',"document supprimer avec success")
        return res.redirect('back')
    }catch(err){
         return res.json({message:"error survenue lors de la supression"})
    }
 
    }
module.exports={
    index,create,store,edit,show,comment_add,getauteur,getcomment,destroy,update
}