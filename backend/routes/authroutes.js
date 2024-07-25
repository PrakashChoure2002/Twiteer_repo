const express=require('express')
const router=express.Router()
const {protectRoute} =require('../middleware/protectedRoute')
const {signup,login,logout,getMe}=require('../controller/authcontroller')




router.get('/me',protectRoute,getMe)
router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)





module.exports=router