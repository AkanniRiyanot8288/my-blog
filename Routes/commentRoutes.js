const express = require("express"); 
const isLogin = require("../middlewares/isLogin");
const { createCommentCtrl, deleteCommentCtrl, updateComment, singleCommentCtrl } = require("../Controller/commentCtrl");
const { fetchAllCategoryCtrl } = require("../Controller/categoryCtrl");
const commentRouter = express.Router();


commentRouter.post("/:id", isLogin, createCommentCtrl);

commentRouter.get("/", fetchAllCategoryCtrl);

commentRouter.get("/:id", isLogin, singleCommentCtrl);

commentRouter.put("/:id", isLogin, updateComment);

commentRouter.delete("/:id",isLogin, deleteCommentCtrl);

// commentRouter.get("/", async (req,res)=>{
//   try {
//     res.json({
//       status: "success",
//       data: "single user"
//     })
//   } catch (error) {
//     res.json(error.message)
//   }
// })

// commentRouter.get("/profile/:id", async (req,res)=>{
//   try {
//     res.json({
//       status: "success",
//       data: "All users"
//     })
//   } catch (error) {
//     res.json(error.message)
//   }
// })

// commentRouter.put("/profile/:id", async (req,res)=>{
//   try {
//     res.json({
//       status: "success",
//       data: "single user"
//     })
//   } catch (error) {
//     res.json(error.message)
//   }
// })
// commentRouter.delete("/profile/:Id", async (req,res)=>{
//   try {
//     res.json({
//       status: "success",
//       data: "Single user"
//     })
//   } catch (error) {
//     res.json(error.message)
//   }
// })

module.exports = commentRouter;