const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const processFile = require("./middleware/upload");
// const uploadImage = require('./helpers/helpers')
// const {mongoconnect} =require('./db');
const cors=require('cors');
const app = express()
const PORT=5000
app.use(cors())
// const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "./keys.json" });
const bucket = storage.bucket("drought-prediction-bucket");

const Multer = multer({Storage})
app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// mongoconnect();
app.post('/uploads',Multer.array('file'), async (req, res, next) => {
 console.log(req.files)
  let files=[];
  let arrtemp=req.files
         const arr= arrtemp.map(async (file,i)=>{
                
                 try {

  
                  if (!file) {
                    return { message: "Please upload a file!" }
                  }
                    
                  
                  
                  const blob = bucket.file(file.originalname);
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
                      await bucket.file(file.originalname).makePublic();
                    } catch {
                      return {
                        message:
                          `Uploaded the file successfully: ${file.originalname}, but public access is denied!`,
                        url: publicUrl,
                      };
                    }
              
                  
                  });
                  blobStream.end(file.buffer);
                 
                } catch (err) {
                 return {
                    message: `Could not upload the file: ${file.originalname}. ${err}`,
                  };
                }
                return {
                  message: "Uploaded the file successfully: " +file.originalname,
                  url: `https://storage.googleapis.com/drought-prediction-bucket/${file.originalname}`,
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
app.use('/api/auth',require('./routes/user'))
app.use('/api/hosting',require('./routes/hosting'))

app.listen(PORT, () => {
  console.log(`server starting at port http://localhost:${PORT}`)
})
