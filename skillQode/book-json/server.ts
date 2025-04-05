import express,{Application,Request,Response} from 'express'
const hostName:string = '127.0.0.1';
const port:number = 5000;
const app:Application = express();
import userRouter from './router/userRouter';

app.get("/",(request:Request,response:Response)=>{
  response.status(200);
  response.json({msg:"Welcome Express Server"});
});

app.use("/api/book",userRouter);

app.listen(port,hostName,()=>{
  console.log(`Server run on http://${hostName}:${port}`);
});