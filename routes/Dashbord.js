const app= require('express')
const { index,create,store } = require('../controller/Dashboard')
const auth = require('../middleware/auth')
const router =app.Router()
const filecontrole=require('../middleware/fileControl')
//pour gerer le multi part du formulaire
const multer = require('multer')
const storagemiddleware = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"./uploads")
    } ,
    filename : (req, file, cb) => {
            cb(null, file.originalname.split('.')[0] + '_' + Date.now() 
            +'.'+ file.originalname.split('.').pop())
        },
    fileFilter: (req,file,cb)=>{
        
    }
});

const upload= multer({storage:storagemiddleware})
//route apres connection
router.get('/index',auth,index);

//route pour ajout de document
router.get('/add_doc',auth,create);

//traitement de la requete ajout de document
router.post('/add_doc',auth,upload.single("fichier"),store);

module.exports=router