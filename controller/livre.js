//recup categories from controller category
const Category = require('../controller/category');

//recuperation du model categorie
var Categorie=require('../models').category

 let  index = async (req, res) =>{
   
      let categorys= await Categorie.findAll({
         attributes: ['intituler'],
         raw:true,
   
     }).then(categorys => { return categorys})
     
     req.isAuthenticated()
    res.render('pages/livre',{categorys})
 }
module.exports = index