//initialisation de la route

const express=require('express')
const router=express.Router()

//getter du controller 
const index = require('../controller/livre');

//route for get all livres
router.get('/',index)

module.exports=router