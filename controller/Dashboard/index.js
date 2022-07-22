let dashboard = async(req,res)=>{
    console.log(req.session)
    res.render('./Dashboard/index',)
}
module.exports={
    dashboard
}