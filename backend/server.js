const express =require('express')
const cookieParser=require('cookie-parser')
const cloudinary = require('cloudinary').v2;
const app=express()


const db=require('./db')
require('dotenv').config()
cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUDE_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret: process.env.CLOUDINARY_API_SECREAT, // Click 'View Credentials' below to copy your API secret
});
PORT=process.env.PORT ||8000

app.use(express.json({lmit:"5mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const authRoutes=require('./routes/authroutes')
const userRoutes=require('./routes/userroutes')
const postRoutes=require('./routes/postroutes')
const notificationRoutes=require('./routes/notificationroutes')
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)
app.use('/api/notification',notificationRoutes)
app.get('/',(req,res)=>{
    res.send("server is ready")
})
app.listen(PORT,()=>{
    console.log("server is running on port 8000")
    db
    
    
})