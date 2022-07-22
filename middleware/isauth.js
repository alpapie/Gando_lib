module.exports=(req,res, next)=>{
    
    req.isAuthenticated=function(){
    if(req.session.isAuth){
    res.locals.isAuth=true
    }else{
        res.locals.isAuth=false
    }
}
next()
}