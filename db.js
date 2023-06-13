const mongoose=require("mongoose");

const mongoURI="mongodb://localhost:27017/HD-dormitory?readPreference=primary&directConnection=true&ssl=false"

const mongoconnect=()=>{
    mongoose.connect(mongoURI)
}
module.exports={mongoconnect};