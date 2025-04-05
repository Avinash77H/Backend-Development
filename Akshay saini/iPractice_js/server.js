const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js")

const port = 9999;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



connectDB()
  .then(() => {
    console.log("database Connection Successfully");
    app.listen(port, () => {
      console.log(`Server run on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Database Connection fail " + error);
  });
