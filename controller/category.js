const Category =require('../models').category
module.exports= Category.findAll({
        attributes: ['intituler'],
        raw:true,
  
    })


// Category.findAll({
//     attributes: ['intituler']
// }).then(categorys => {
//     res.render('pages/livre',{categorys:categorys})
// }).catch(err => {
//     res.render('pages/error',{'error':err})

// })