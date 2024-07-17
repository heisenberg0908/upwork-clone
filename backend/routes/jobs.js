const express=require('express')
const jobsRouter=express.Router()
const {Jobs}=require('../db')
const zod=require('zod')
const {JWT_SECRET}=require('../config')
const jwt=require('jsonwebtoken')
const {Application}=require('../db')

jobsRouter.get('/all',async(req,res)=>{
    const allJobs=await Jobs.find({})
    res.status(200).json({
        msg:"all jobs",
        allJobs:allJobs
    })
})
const jobinputData=zod.object({
    title:zod.string(),
    description:zod.string(),
    budget:zod.string(),
    location:zod.string(),
    skill1:zod.string(),
    skill2:zod.string(),
    skill3:zod.string(),
    skill4:zod.string(),
    skill5:zod.string(),
    time:zod.string()
})
jobsRouter.post('/postjob', async (req, res) => {
    const token = req.headers.authorization;
    console.log(token)

    // Check if token is present
    if (!token) {
        return res.status(401).json({
            msg: "Token is missing"
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const postedby = decoded.userId;
        
        // Assuming the token contains a user ID
        console.log("posted by "+ postedby)
        // Validate the request body
        const { success, error } = jobinputData.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                msg: "Invalid input credentials, try again",
                error: error.errors
            });
        }

        const { title, description, budget, location, skill1,skill2,skill3,skill4,skill5, time } = req.body;

        // Create the job
        const job = await Jobs.create({
            title,
            description,
            budget,
            location,
            skill1,
            skill2,
            skill3,
            skill4,
            skill5,
            time,
            postedby
        });

        const jobId = job._id;
        res.status(200).json({
            msg: "Job posted successfully",
            jobId: jobId
        });

    } catch (error) {
        console.error(error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }

        res.status(500).json({
            msg: "An error occurred",
            error: error.message
        });
    }
});

jobsRouter.get('/jobspostedbyme', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            msg: "authentication failed, try signing in again."
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const userId = decoded.userId;

        const jobs = await Jobs.find({
            postedby: userId
        });

        return res.status(200).json({
            msg: "your jobs",
            jobs: jobs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Server error"
        });
    }
});
jobsRouter.post('/apply', async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            msg: "Authentication failed, try signing in again."
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const userId = decoded.userId;
        const { jobId, coverLetter } = req.body;

        // Ensure the job exists
        const job = await Jobs.findById(jobId);
        if (!job) {
            return res.status(404).json({
                msg: "Job not found."
            });
        }

        // Create a new application
        const application = new Application({
            jobId: jobId,
            userId: userId,
            coverLetter: coverLetter
        });

        await application.save();

        res.status(201).json({
            msg: "Application submitted successfully",
            application: application
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Server error"
        });
    }
});
jobsRouter.put('/job',(req,res)=>{
    res.status(200).json({
        msg:"job updated successfully"
    })
})
module.exports=jobsRouter