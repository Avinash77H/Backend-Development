import express,{Application,Request,Response} from 'express';
import dotenv from 'dotenv'


dotenv.config({path:"./.env"});

const app:Application = express();



app.listen(Number(process.env.PORT) || 8888,()=>{
  console.log(`Server run on http://localhost:${process.env.PORT}`)
});