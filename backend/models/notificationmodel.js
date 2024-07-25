const mongoose=require('mongoose')

const notificationSchems=new mongoose.Schema({

    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    types:{
        type:String,
        required:true,
        enum:['follow','like']
    },
    read:{
        type:Boolean,
        default:false,
    }

},{timestamps:true})

const Notification=mongoose.model("Notification",notificationSchems)
module.exports=Notification