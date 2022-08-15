//recuprearion de render dans ejs
const { render } = require('ejs')

const fs = require('fs')

//import passport 
let passport =require('passport') 
let passportLocale =require('passport-local') 
//evn access 
require('dotenv').config()
//instatiation de express
express=require('express')
app =express()
//get session dans express
var session = require('express-session')



//monteur de template
app.set('view engine', 'ejs')

//on utiluse le express.json() pour recuperer les donnes du formulaire
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//middleware  
app.use(express.static('public'))

//on paremetre la sesssion 
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: true,
  })
)

//on utilise le middleware flash pour les message
app.use(require('./middleware/flash'))
//on utilise le middleware isauth pour verifier si l'utilisateur est connecter
app.use(require('./middleware/isauth'))
//middleware pour les Category
app.use(require('./middleware/getCagetegory'))


//initialisation des chemins
app.use('/',require('./routes/route'))

app.use('/livre',require('./routes/livre'))

// route pouur le traitement des donne du user a savoir (connection ,inscription)
app.use('/user',require('./routes/user'))

//le dashboard
app.use('/dashboard',require('./routes/Dashbord'))


app.get('/article',(req, res)=>{
    res.render('pages/article',)
})

app.get('/a-propos',(req, res)=>{
    res.render('pages/a-propos')
})

app.get('/faire-don',(req, res)=>{
    res.render('pages/don')
})

app.get('/contact',(req, res)=>{
    res.render('pages/contact')
})

// app.get('/connexion',(req, res)=>{
//     res.render('pages/connection')
// })

// app.get('/inscription',(req, res)=>{
//     res.render('pages/inscription')
// })


// port et lisn d'ecoute
app.listen(3300,()=>{
    console.log("veiller cliquer sur ce lien: http://localhost:3300")
})