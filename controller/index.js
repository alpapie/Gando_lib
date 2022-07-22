// https://www.googleapis.com/books/v1/volumes?q=sn&key=AIzaSyDR-230xo0A0jg9VKH937iQvDPNcCZzQII
const books=require('../book')

let items=['ALL','COOK','CHILDREN','ADVENTURE','BIOGRAPHIC']
        
let index =(req,res)=>{
    res.render('pages/index',{"items":items,'books':books})
}

module.exports =index