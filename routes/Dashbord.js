const app= require('express')
const { index,create,store,edit,show} = require('../controller/Dashboard')
const auth = require('../middleware/auth')
const router =app.Router()

//pour gerer le multi part du formulaire
const multer = require('multer')
const storagemiddleware = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"./uploads/files")
    } ,
    filename : (req, file, cb) => {
            cb(null, file.originalname.split('.')[0] + '_' + Date.now() 
            +'.'+ file.originalname.split('.').pop())
        }
});

const upload= multer({storage:storagemiddleware})
//route apres connection
router.get('/index',auth,index);

//route pour ajout de document
router.get('/add_doc',auth,create);

//traitement de la requete ajout de document
router.post('/add_doc',auth,upload.single("fichier"),store);

//route for details of document
router.get('/file/detailFile/:id',auth,show);

//form for modification of document
router.get('/file/file_edit/:id',auth,edit)

module.exports=router