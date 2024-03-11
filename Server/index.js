import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv'

import "./Database/db.js"
import router from './Routes/routes.js';


const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
config();
app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));


//API
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
