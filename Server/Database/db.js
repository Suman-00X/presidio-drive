import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const DB = process.env.MONGO_URL

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})