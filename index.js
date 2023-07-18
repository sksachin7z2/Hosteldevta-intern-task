// const express = require('express')
import express from 'express'
// const bodyParser = require('body-parser')
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import crypto from 'crypto'
import userRoute from './routes/user.js'
import hostingRoute from './routes/hosting.js'
import bookingRoute from './routes/booking.js'
import paymentRoute from './routes/paymentgateway.js'
import transactionRoute from './routes/transaction.js'
import reviewsRoute from './routes/reviews.js'
import { format } from 'util'

import { Storage } from '@google-cloud/storage'

import { fileURLToPath } from 'url';
import db from "./firebase-config.js";
import { collection, query, where, getDocs, getDoc, addDoc, doc, onSnapshot, limit, deleteDoc,updateDoc } from "firebase/firestore";

const app = express()
const PORT=process.env.PORT||5000
app.use(cors())



const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "./keys.json" , projectId:'dorminn' });
const bucket = storage.bucket("media-bucket-7z2");

const Multer = multer({Storage})
app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(__dirname+'/build'))

// mongoconnect();
app.post('/uploads',Multer.array('file'), async (req, res, next) => {
 console.log(req.files)
  let files=[];
  let arrtemp=req.files
         const arr= arrtemp.map(async (file,i)=>{
          let encryptedfilename= new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              
              resolve(filename);
            });
          });
          let newfilename=await encryptedfilename
          console.log(newfilename)
                 try {

  
                  if (!file) {
                    return { message: "Please upload a file!" }
                  }
                    
                 
                  const blob = bucket.file(newfilename);
             
                  const blobStream = blob.createWriteStream({
                    resumable: false,
                  });
              
                  blobStream.on("error", (err) => {
                    return { message: err.message };
                  });
              
                  blobStream.on("finish", async (data) => {
                    // Create URL for directly file access via HTTP.
                    const publicUrl = format(
                      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                    );
              
                    try {
                      // Make the file public
                      await bucket.file(newfilename).makePublic();
                    } catch {
                      return {
                        message:
                          `Uploaded the file successfully: ${newfilename}, but public access is denied!`,
                        url: publicUrl,
                      };
                    }
              
                  
                  });
                  blobStream.end(file.buffer);
                 
                } catch (err) {
                 return {
                    message: `Could not upload the file: ${newfilename}. ${err}`,
                  };
                }
                return {
                  message: "Uploaded the file successfully: " +file.originalname,
                  url: `https://storage.googleapis.com/media-bucket-7z2/${newfilename}`,
                }
          })
          const arr1=await Promise.all(arr)
  
  return res.json({files:arr1})
})

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  })
  next()
})

setInterval(async()=>{
  const querySnapshot = await getDocs(collection(db, "booking"));
 let arr= querySnapshot.docs.map(async(e)=>{
    if((new Date(e.data().checkout)<new Date()) && (e.data().ispaid===true))
    {
      try {
        const docRef = doc(db, "booking", e.id);
        const update=await updateDoc(docRef,{isfree:false})
        
      } catch (error) {
        console.log(error)
      }
    
    }
    return 0
  })
  let arr2=await Promise.all(arr)
},12000)
app.use('/api/auth',userRoute)
app.use('/api/hosting',hostingRoute)
app.use('/api/booking',bookingRoute)
app.use('/api',paymentRoute)
app.use('/api/transaction',transactionRoute)
app.use('/api/reviews',reviewsRoute)

app.get('/profile',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/info',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/profile/security',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/profile/payments',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/listings',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/bookings',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/profile/payments/managepayments',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/profile/security/resetpassword',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/getlocation',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/profile/payments/payout',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/congratulation',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/review-listing',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/securitycontact',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/set-a-price',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/step3',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/add-title-description',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/add-photo',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/add-ammeneties',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/moreinfo',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('hosting/:id/about-rooms',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/locate-your-dorm',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/hosting/:id/about-your-dorm',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/aboutyourplace',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/dormitoryinfo',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/getlocationok',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/paymentstatus/:id/:bid',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/payment/:id/:bid',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/detail/:id',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
app.get('/dashboard',(req,res)=>{
    res.sendFile(__dirname+'/build/index.html')
}) 
 
  app.listen(PORT, () => {
  console.log(`server starting at port http://localhost:${PORT}`)
})
