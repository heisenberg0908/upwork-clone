const mongoose=require('mongoose')
const {MONGO_URL}=require('./config')
mongoose.connect(MONGO_URL)

const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    password:{type:String,required:true}
    
})

const jobSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    postedon:{type:Date,default:Date.now},
    budget:{type:String,required:true},
    postedby:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    skill1:{type:String,required:true},
    skill2:{type:String,required:true},
    skill3:{type:String,required:true},
    skill4:{type:String,required:true},
    skill5:{type:String,required:true},
    location:{type:String,required:true},
    time:{type:String,required:true}
})
const applicationSchema=new mongoose.Schema({
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:'Jobs',required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    coverLetter:{type:String,required:false},
    appliedOn:{type:Date,default:Date.now()}
})
         
const User=new mongoose.model('User',userSchema)
const Jobs=new mongoose.model('Jobs',jobSchema)
const Application=new mongoose.model('Application',applicationSchema)

module.exports={
    User,
    Jobs,
    Application
}