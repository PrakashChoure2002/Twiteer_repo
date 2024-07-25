const express=require('express')
const router=express.Router()
const {protectRoute}=require('../middleware/protectedRoute')
const {getUserProfile,followUnfollowUser,getsuggestedUsers,updateUser}=require('../controller/usercontroller')

router.get('/profile/:username',protectRoute,getUserProfile)

router.get('/suggested',protectRoute,getsuggestedUsers)

router.post('/follow/:id',protectRoute,followUnfollowUser)

router.post('/update',protectRoute,updateUser)


module.exports=router