let jwt=require('jsonwebtoken')
//fonction de verification du token
module.exports=(req,res,next)=>{
    try{ 

        //recuperation du code dans la session
        let token =req.session.token
        if (token) {
            //verification du token
            let verif=jwt.verify(token,process.env.ACCESS_TOKEN)
            // console.log(verif)
            let user=verif.user
            req.auth={
                user
            }
            req.session.isAuth=true
            req.isAuthenticated()
            next()

    } else {
        req.flash('error',"vous n'avez pas le droit d'accéder à cette page connecter vous")
        return res.redirect('/user/connection')
    }
    }catch(error){
        res.status(403).json({error})
    }
    
}
