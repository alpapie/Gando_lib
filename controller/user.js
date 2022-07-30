// const Compte= require('../models').compte;
const User= require('../models').user;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//la methode qui renvoi le formulaire
let signPage =async (req,res)=>{
    res.render('pages/inscription')
}

//la methode qui traite le formulaire d'inscription
let signUp =async (req,res)=>{
    //on verifie si le boby n'est pas vide
    
    if (req.body){
        let {prenom,nom,email,password,passwordverif,entreprise,adress,adress1,role,numero}= req.body
        //on verifie le password et sa confirmation
        if (password === passwordverif){
        //la fonction de hashage qui renvoi un promise avec le hash
        bcrypt.hash(password,10).
        then(hash=>{
            // creation d'un compte user apres avoir recuperer le hash et il y'a aussi une relation many to many
            User.create({prenom,nom,email,password:hash,entreprise,adress,adress1,role,numero})
        }).catch(err=>{
            req.flash('error',"une erreur est survenue")
            return res.redirect('/user/inscription')
        })
        //tous c'est bien passer on renvoie vers la page de connexion
        return res.redirect('/user/connection')
        }else{
            //le middleware flash pour renvoi un message d'erreur
            req.flash('error',"les mot de passe ne corresponde pas")
            return res.redirect('/user/inscription')
        }
    }
    req.flash('error',"le formulaire est vide")
   return res.redirect('/user/inscription')
}

let connectpage =async (req,res)=>{
    res.render('pages/connection')
}

let connect= (req,res)=>{
    let {email,password} = req.body
    //on cherrche l'utilisateur avec les donne demander
    User.findOne({where:{email}}).
    then(user=>{
        //s'il existe
        if (user===null){
        req.flash('error',"Identifiant ou mot de passe incorrecte")
        return res.redirect('/user/connection')
        }
        //on verifie le mot de passe
        
        bcrypt.compare(password,user.password).
        then(result=>{
            //supression de apassword
            user.password=undefined
            //si le mot de passe est correct
            if (result){
                //on creer un token
                let token=jwt.sign({user},process.env.ACCESS_TOKEN)
                // //on enregistre le token dans la session
                req.session.token=token
                //on renvoie vers la page de connexion
                return res.redirect('/dashboard/index')
            }
            //si le mot de passe est incorrect
            req.flash('error',"Identifiant ou mot de passe incorrecte")
            return res.redirect('/user/connection')
        }).catch(err=>{
            req.flash('error',"Identifiant ou mot de passe incorrecte")
            return res.redirect('/user/connection')
        }
        )
    }).catch(error=>{
        console.log(error)
    })
}
let logouter = (req,res)=>{
    //on supprime la session
    req.session.destroy()
    //on renvoie vers la page de connexion
    return res.redirect('/user/connection')
}

module.exports={
    signPage,
    signUp,
    connectpage,
    connect,
    logouter
} 

