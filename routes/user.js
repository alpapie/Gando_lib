const {signPage,signUp,connect,connectpage}=require('../controller/user')

const app= require('express')
const { dashboard } = require('../controller/Dashboard')
const auth = require('../middleware/auth')
const router =app.Router()

//route pour recupere la page d'inscription
router.get('/inscription',signPage)

//route pour le traitement de formulaire
router.post('/inscription',signUp)

//formulaire de connection
router.get('/connection',connectpage)

//route for auth
router.post('/connection',connect)

router.get('/dashboard/index',auth,dashboard)

module.exports=router