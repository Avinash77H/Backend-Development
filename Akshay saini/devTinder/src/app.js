const express = require("express");
const connectDB = require("./config/database");
const app = express();
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require('./routes/request.js');
const userRouter = require("./routes/user.js");
const cookieParser = require("cookie-parser");
const cors = require('cors');

require('dotenv').config();

// require('./utils/cronjob.js');

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use(express.json()); // json middleware which run all incoming request
app.use(cookieParser()); // cookieParser middleware help to read cookies

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB()
  .then((res) => {
    console.log("Database Connected");
    app.listen(process.env.PORT, () => console.log(`server run on http://localhost:${process.env.PORT}`));
  })
  .catch((err) => console.log("Database Connection failed", err));
