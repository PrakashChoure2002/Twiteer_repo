const express=require('express')
const router=express.Router()
const {protectRoute} =require('../middleware/protectedRoute')
const {getnotification,deletenotificatin}=require('../controller/notificationcontroller')
router.get('/',protectRoute,getnotification)
router.delete("/", protectRoute, deletenotificatin);


module.exports=router