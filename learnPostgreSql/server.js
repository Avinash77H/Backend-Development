const express = require("express");
const connectDB = require("./config/database");
const userRouter = require("./router/userRouter");
const userDetailsRouter = require('./router/userDetailsRouter');

const app = express();

const port = 9999;

app.use(express.json());
app.use("/", userRouter);
app.use("/",userDetailsRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server run on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Database Cannot be connected", error);
  });
