const express = require("express");
require("dotenv").config();
require("./Config/dbConnect");
const userRouter = require("./Routes/userRoutes");
const postRouter = require("./Routes/postRoutes");
const commentRouter = require("./Routes/commentRoutes");
const categoryRouter = require("./Routes/categoryRoutes");
const globalErrHandler = require("./middlewares/globaErrHandler");







const app = express();


//middleware
app.use(express.json());
const userAuth = {
  isLogin: true,
  isAdmin: false,
};
app.use((req, res, next) =>{
  if(userAuth.isLogin){
    next();
  }else{
    return res.json({
      msg: "Invalid login credential",
    });
  }
});
//routes
//-----User-----

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/category", categoryRouter);



//Error handlers middleware
app.use(globalErrHandler);

//404 error
app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} - Route not found,`
  });
});

//Listen to server

const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`server is running on ${PORT}`));
