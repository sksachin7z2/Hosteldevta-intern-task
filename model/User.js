const mongoose = require('mongoose');

const { Schema } = mongoose;

  const UserSchema = new Schema({
      
   name:{
    type:String,
   required:true
   },
   email:{
       type:String,
       required:true
   },
   password:{
       type:String,
       default:null,
       required:true
   },
   contact:{
    type:Number,
   },
   createdAt:{
       type:Date,
       default:Date.now
   }
  },{ timestamps: true});
  const User=mongoose.model('user',UserSchema);
  
  module.exports=User;
