const express=require('express')
const app=express()
const cors=require('cors')
const userRouter=require('./routes/user')
const jobsRouter=require('./routes/jobs')
const port=3000
app.use(express.json())
app.use(cors())

app.use('/api/v1/users',userRouter)
app.use('/api/v1/jobs',jobsRouter)


app.listen(port,()=>{
    console.log(`app is listening to port ${port}`)
})
