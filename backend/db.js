const mongoose=require('mongoose')
require('dotenv').config()

const mongoURL=process.env.mongo_URL
mongoose.connect(mongoURL,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
});


const db=mongoose.connection;

db.on('connected',()=>{
    console.log("database is connected properly")
})

db.on('error',(err)=>{
    console.log("database error",err)
})

db.on('disconnected',()=>{
    console.log("database is disconnected properly")
})

module.exports=db;