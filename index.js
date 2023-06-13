const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const processFile = require("./middleware/upload");
// const uploadImage = require('./helpers/helpers')
const {mongoconnect} =require('./db');
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

app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoconnect();
app.post('/uploads', async (req, res, next) => {
 
    try {
      await processFile(req, res);
  
      if (!req.file) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
        
      // Create a new blob in the bucket and upload the file data.
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });
  
      blobStream.on("error", (err) => {
        res.status(500).send({ message: err.message });
      });
  
      blobStream.on("finish", async (data) => {
        // Create URL for directly file access via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
  
        try {
          // Make the file public
          await bucket.file(req.file.originalname).makePublic();
        } catch {
          return res.status(500).send({
            message:
              `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
            url: publicUrl,
          });
        }
  
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
          url: publicUrl,
        });
      });
  
      blobStream.end(req.file.buffer);
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }

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
