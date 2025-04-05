const express = require('express');
const {CreateUser, ReadUser , FindUserById , UpdateUser , DeleteUser} = require('../controller/userController');

const userRouter = express.Router();

userRouter.post('/createuser',CreateUser);
userRouter.get('/readuser',ReadUser);
userRouter.get('/finduserbyid/:userId',FindUserById);
userRouter.patch('/updateuser/:userId',UpdateUser);
userRouter.delete('/deleteuser/:userId',DeleteUser);

module.exports = userRouter;