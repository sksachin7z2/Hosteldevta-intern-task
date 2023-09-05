// const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

  const UserSchema = new Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    lat:{
      type:String,
      required:true
    },
    lon:{
      type:String,
      required:true
    },
    rooms:{
      type:Object,
      default:0,
       required:true
    },
   people:{
      type:Number,
      default:0,
   },
   ammeneties:{
      type:Array,
      default:[],
      required:true
   },
  contact:{
      type:Array,
      default:[]
  },
  photos:{
      type:Array,
      default:[],
  },
  price:{
    type:Number,
    required:true
  },
  discount:{
      type:Number,
      default:0
  },
  security:{
      type:Array,
      default:[]
   },
   createdAt:{
       type:Date,
       default:Date.now
   }
  },{ timestamps: true});
  const User=mongoose.model('hosting',UserSchema);
  
  module.exports=User;
