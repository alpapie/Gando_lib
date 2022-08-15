const Category=require('../models').category

module.exports= async (req,res,next)=>{
    try{
        //get all categorise
        let categorys= await Category.findAll({
            attributes: ['intituler'],
            raw:true,
        })
        res.locals.categorys=categorys
        next()
        
    }catch(err){
        res.status(403).json({error})
    }
  
}