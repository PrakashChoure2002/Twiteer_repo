const express=require('express')
const router=express.Router()
const {protectRoute}=require('../middleware/protectedRoute')
const{createpost,deletepost,getAllPosts,commentpost,likeunlikepost,getlikedpost,getFollowingPosts,getUserPosts}=require('../controller/postcontroller')

router.post('/create',protectRoute,createpost)
router.delete('/:id',protectRoute,deletepost)
router.post('/comment/:id',protectRoute,commentpost)
router.post('/like/:id',protectRoute,likeunlikepost)
router.get('/allpost',protectRoute,getAllPosts)
router.get('/user/:username',protectRoute,getUserPosts)
router.get('/following',protectRoute,getFollowingPosts)  //this is not working data
router.get('/liked/:id',protectRoute,getlikedpost)  //this is not showing the data inthe postman









module.exports=router