import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import path from 'path';
import userRouter from './routes/user.route.js'
dotenv.config();


mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app = express();

app.listen(3000,()=>{
     console.log('Server is runnning on port 3000!!!');
})

// app.get('/test', (req, res) => {
//     const filePath = path.join(process.cwd(),'api', 'doc.txt');
//     res.sendFile(filePath);
// });

// app.get('/test', (req,res)=>{
//     res.send("API is working!!");
// })

app.use('/api/user', userRouter);