const express = require('express');
const {createUserDetails,getUserDetails} = require('../controller/userDetailsController.js');


const userDetailsRouter = express.Router();

userDetailsRouter.post('/createuserdetails',createUserDetails);
userDetailsRouter.get('/getuserdetails',getUserDetails);

module.exports = userDetailsRouter;