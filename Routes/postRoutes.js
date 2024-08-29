const express = require("express");
const { createPostCtrl, deletePostCtrl, singlePostCtrl, updatePost, fetchallPosts, toggleLikesCtrl, toggleDisLikesCtrl, postDetailsCtrl } = require("../Controller/postCtrl");
const isLogin = require("../middlewares/isLogin");
const storage = require("../config/cloudinary");
const multer = require("multer");
const postRouter = express.Router();

//instance of multer
const upload = multer({ storage });

postRouter.post("/", isLogin, createPostCtrl);

// postRouter.get("/:id", isLogin, singlePostCtrl);

postRouter.get("/",isLogin,fetchallPosts);

postRouter.get("/likes/:id",isLogin, toggleLikesCtrl);

postRouter.get("/dislikes/:id",isLogin, toggleDisLikesCtrl);

postRouter.get("/:id",isLogin, postDetailsCtrl);

postRouter.delete("/:id", isLogin, deletePostCtrl);

postRouter.put("/:id", isLogin, upload.single("photo"), updatePost);


module.exports = postRouter;