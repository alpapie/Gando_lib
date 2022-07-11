const { render } = require('ejs')

express=require('express')
app =express()

//monteur de template
app.set('view engine', 'ejs')

//middleware 
app.use(express.static('public'))

let categorys=['Biography','Business','Cookbooks','Health & Fitness','History','Fantasy','Mystery','Music',
'Toys','Hoodies','Fiction','Inspiration','Romance','Fiction/Fantasy','Humor','Kids',' Music',
'hoodies']
//les routes et page correspondant
app.get('/',(req ,res)=>{
    let items=['ALL','COOK','CHILDREN','ADVENTURE','BIOGRAPHIC']
    res.render('pages/index',{"items":items})
})

app.get('/livre',(req, res)=>{
   
    res.render('pages/livre',{'categorys':categorys})
})

app.get('/article',(req, res)=>{
    res.render('pages/article',{'categorys':categorys})
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

app.get('/connexion',(req, res)=>{
    res.render('pages/connection')
})

app.get('/inscription',(req, res)=>{
    res.render('pages/inscription')
})


// port et lisn d'ecoute
app.listen(3300,()=>{
    console.log("veiller cliquer sur ce lien: http://localhost:3300")
})