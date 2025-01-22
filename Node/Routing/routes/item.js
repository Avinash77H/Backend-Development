const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
  res.send("Got a GET Request")
 
});

router.post('/items',(req,res)=>{
  res.send("Got a Post requests")
});

router.put('/items/:id',(req,res)=>{
  res.send("Got a Put Requests")
});

router.delete('/items/:id',(req,res)=>{
  res.send("Got a DELETE Requests")
});

module.exports = router