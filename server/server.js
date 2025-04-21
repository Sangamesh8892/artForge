import dotenv from 'dotenv';
dotenv.config({path :'./.env'});

import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import Imagerouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();  


app.use(cors({
    origin: ['https://art-forge.vercel.app',      
        'https://sangamesh-project-artforge.vercel.app', 
        'http://localhost:5173'],
    credentials: true
  }));
app.use(express.json());

await connectDB();

app.use('/api/user',userRouter);
app.use('/api/image',Imagerouter);
app.get('/',(req,res)=>{
    res.send('Results API is running...')
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
