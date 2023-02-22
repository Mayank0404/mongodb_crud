const express=require('express')
const { findById } = require('../model/employee.model')
const router=express.Router()
const Employee= require('../model/employee.model')
const jwt=require('jsonwebtoken')
//home page
router.get('/',(req,res)=>{
    res.render("home")
})
//add emp button
router.get('/add-emp',(req,res)=>{
    res.render("addEmp")

})
//saving emp into db
router.post('/save-emp',(req,res)=>{
    let Emp=new Employee()
    Emp.fullName=req.body.fullName
    Emp.email=req.body.email
    Emp.mobile=req.body.phone
    Emp.city=req.body.city

    Emp.save((err,result)=>{
        if(!err){
            res.redirect("/emp")
        }else{
            console.log("Save Error",err);
        }
    })
})
// showing emp
router.get('/show-all-emp',(req,res)=>{
    Employee.find((err,result)=>{
        if(!err){
            res.render('showEmp',{list:result})
        }else{
            console.log("error",err);
        }
    })
})
//delete button
router.get('/delete-all-emp',(req,res)=>{
    Employee.find((err,result)=>{
        if(!err){
            res.render('delete',{list:result})
        }else{
            console.log("error",err);
        }
    })
})
//deleting the record from db
router.get('/final-delete/:uid',(req,res)=>{
    Employee.findByIdAndDelete(req.params.uid,(err,result)=>{
        if(err) console.log(err)
        else
        res.redirect('/emp/delete-all-emp')
    })
})
router.get('/update-all-emp',(req,res)=>{
    Employee.find((err,result)=>{
        if(!err){
            res.render('updateEmp',{list:result})
        }else{
            console.log("error",err);
        }
    })
})

router.get('/pre-update/:id',(req,res)=>{
      Employee.findById(req.params.id,(err,result)=>{
        if(err) console.log(err)
        else{
            res.render('preEmpUpdate',{emp:result})

         }
      })
})

router.post('/final-update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,req.body,{new:true},(err,result)=>{
        if(err) console.log(err)
        else res.redirect('/emp/update-all-emp')
    })
  })


  router.post('/api/posts',verifyToken,(req,res)=>{

    jwt.verify(req.token,'mayank',(err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message:'Post Created!!!',
                data:data
            })
        }
    })
    res.json({
        message:'Post Created!!!'
    })
})

router.post('/login',(req,res)=>{
    // Mock user
    const user={
        id:1,
        username:'steve',
        password:'3000'
    }

    jwt.sign({user:user},'mayank',{expiresIn:'60s'},(err,token)=>{
        res.json({token})
    })
})

//Format of token
//Authorization: Bearer <Token>
function verifyToken(req,res,next){

    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined

    if(typeof bearerHeader!='undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        // Get toke from the array
        const bearerToken = bearer[1];
        //set the token
        req.token = bearerToken;
        //next middleware
        next();
    }else{
        res.sendStatus(403)
    }

}



// exporting modules
module.exports=router  
