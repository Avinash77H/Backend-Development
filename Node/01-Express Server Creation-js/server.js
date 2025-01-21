import express from 'express'

const hostName = "127.0.0.1";
const port = 9999;

const app = express();

app.get('/',(request,response)=>{
    response.status(200);
    response.json({
        msg:"Hello I am Avi..."
    });
});

app.listen(port,hostName,() => {
    console.log(`Server is Started at http://${hostName}:${port}`);
});