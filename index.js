import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import crypto from 'crypto'
import userRoute from './routes/user.js'
import hostingRoute from './routes/hosting.js'
import bookingRoute from './routes/booking.js'
import paymentRoute from './routes/paymentgateway.js'
import transactionRoute from './routes/transaction.js'
import reviewsRoute from './routes/reviews.js'
import db from "./firebase-config.js";
import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
// import {mongo} from 'mongoose'



import { collection, query, where, getDocs, getDoc, addDoc, doc, onSnapshot, limit, deleteDoc,updateDoc } from "firebase/firestore";
const app = express()
const PORT=5000
app.use(cors())
app.disable('x-powered-by')

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


// const mongoURI="mongodb+srv://sksachin7z2:ne3e6EGnklkQaiw3@cluster0.hlrymf6.mongodb.net/?retryWrites=true&w=majority"
const mongoURI="mongodb://127.0.0.1:27017/npk?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
mongoose.connect(mongoURI,()=>{
  console.log("mongo connected");
})
const conn = mongoose.createConnection(mongoURI,()=>{
  console.log("connected to mongo")
});

let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
app.post('/uploads/:id',upload.array('file'), async (req, res, next) => {
  try {

    // let sumweight=parseFloat(req.body.weight);
    
    const arr=req.files
    
    const hosturl="http://localhost:5000"
           let photos1=arr.map((e)=>{
              return {url:`${hosturl}/image/${e.filename}`}
           })
           let photos=await Promise.all(photos1)
           console.log(photos)
           const hostId=req.params.id
           console.log(hostId)
           const docRef = doc(db, "hosting", hostId);
           const docSnap = await getDoc(docRef);
            
             if (!docSnap.exists()) {
               return res.status(404).send("Not found");
             }
             // if (docSnap.data().user.toString() !== req.user.id) {
             //   return res.status(401).send("not authorised");
             // }
             const host=docSnap.data()
             const updatedhosting=await updateDoc(docRef,{photos:photos?photos:host.photos});
              console.log(updatedhosting)
             return res.json({files:photos})
             
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error");
        }
    
    });

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err,
    message: 'Internal server error!',
  })
  next()
})
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    console.log(file)
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' ||file.contentType === 'image/jpg') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

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
