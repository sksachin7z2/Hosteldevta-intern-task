
const express =require('express');
const router=express.Router();
const User=require('../model/User')
const fillter=require('../middleware/fetchuser')
const bcrypt= require('bcryptjs')
var jwt = require('jsonwebtoken');


const JWT_SECRET="Hostel4>v7A"

router.post('/createUser',async(req,res)=>{
try{
let user= await User.findOne({email:req.body.email});
if(user){
  return res.status(400).json({status:"user with this email already exists"}) 
}
const salt=await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password,salt);

   user= await User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email,
        contact:req.body.contact
      })
  const data={
   id:user.id
  }
  const authToken = jwt.sign(data, JWT_SECRET);
  res.json({status:"User added to database",authToken:authToken,user})
  
    }catch (error){
      console.error(error.message);
      res.status(500).send("Internal Server Error") 
    }
  })
  router.post('/login',async(req,res)=>{
  
 const {email,password}=req.body;
 try {
   let user=await User.findOne({email:email});
   if(!user){
    return res.status(400).json({status:"please try to login with corrrect credentials"});

   }
   const passwordCompare=await bcrypt.compare(password,user.password);
   if(!passwordCompare){
   
    return res.status(400).json({status:"please try to login with corrrect credentials"});
    
   }
   const data={
   id:user.id
  }
  const authToken = jwt.sign(data, JWT_SECRET);
  res.json({status:"User loggedin",authToken:authToken,user})
  
 } catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error Occured")
   
 }

  })
 
    router.post('/getuser',fillter,async(req,res)=>{
    try {
     const userId=  req.user.id;
      const user= await User.findById(userId).select("-password")
      if(!user){
        return res.json({status:"User not found"})
      }
      res.json({status:"user found",user})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured")
    }
  })

router.delete("/deleteuser", fillter, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("Unauthorized");
    }
    user = await User.findByIdAndDelete(req.user.id);
    res.json({ success: "Your account has been deleted",deleteduser:user});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

router.put('/updateuser',fillter,async(req,res)=>{
    const {email,password,name}=req.body;
    try {
        let user = await User.findById(req.user.id);
       
        if (!user) {
          return res.status(404).json({status:"Unauthorized"});
        }
        
        const salt=await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password?req.body.password:"",salt)
        const updateduser=await User.findByIdAndUpdate(req.user.id,{email:email?email:user.email,password:password?secPass:user.password,name:name?name:user.name},{new:true});
        res.json({status:"User info Updated",updatedinfo:updateduser})
    } catch (error) {
        console.error(error);
    res.status(500).send("Internal Server Error Occured");
    }
})
module.exports = router