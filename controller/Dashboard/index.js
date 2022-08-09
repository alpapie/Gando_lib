const Document = require('../../models').document
const Auteur = require('../../models').auteur
const Ecrit = require('../../models').ecrit
const category = require('../../models').category

const fs = require('fs');
const pdf = require('pdf-thumbnail');
//la page d'acceuil du dashboard
let index = async(req,res)=>{
    //on recuper le user a l'aide du middleware auth qui passe les donne du user dans la requete
    let userId=req.auth.user.id

    //on recupere les documents du l'user
    let documents= await Document.findAll({
        where:{ user_id:userId},
        raw:true,
    })
    if (documents.length >0){
        //on renvoie un message d'erreur sur la page d'acceuil
        for(let i=0;i<documents.length;i++){
            //on recupere les auteurs du document
            documents[i].auteur= await Ecrit.findAll({
                where:{ doc_id:documents[i].id},
                include:[{model:Auteur}],
                raw:true,

            })
        }
        //console.log(documents[0].auteur["auteur.nom"])
        return  res.render('./Dashboard/index',{documents})
    
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


//formulaoir de stockage du document
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

            //creation du thumbnail
            // let imgname= req.file.originalname.split('.')[0] + '_' + Date.now() 
            // +'.jpeg'
            // let gmthumb=gm(pathfile).thumb(150 , 150 , './uploads/thumbnails'+imgname, 100,err=>{
            //     if(err){
            //         console.log(err)
            //     }
            // })
          
            //des requet async pour stocker le document dansles table document auteur et ecrit
            const document=await Document.create(data).then(async doc=>{
                const auteur= await Auteur.create(data).then(async aut=>{
                    const ecrit= await Ecrit.create({aut_id:aut.id , doc_id:doc.id})
                })
            })   
            const pdfBuffer=fs.readFileSync(pathfile)
            pdf(
                pdfBuffer
              )
                .then(data /*Stream of the image*/ => {
                  console.log(data)
                })
                .catch(err => console.log(err))
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

let edit= async (req,res)=>{
    let id=req.params.id
    let document= await Document.findOne({
        where:{id:id},
        raw:true,
    })
    console.log(document)
}
module.exports={
    index,create,store,edit
}