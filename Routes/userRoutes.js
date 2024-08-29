const express = require ("express");
const { login, allUsers, updateUser,profilePhotoUploadCtrl, whoViewedMyProfileCtrl, followingCtrl, unFollowCtrl, blockedUserCtrl, unBlockedUserCtrl, register, adminBlockUserCtrl, singleUser, deleteUserCtrl, adminUnBlockUserCtrl, updatePasswordCtrl,  } = require("../Controller/userCtrl");
const isLogin = require("../middlewares/isLogin");
const multer = require("multer");
const storage = require("../Config/cloudinary");
const userRouter = express.Router()


//Instance of multer
const upload = multer({storage})

// Register user
userRouter.post("/register", register);

// login user
userRouter.post("/login", login );

// All users
userRouter.get("/", allUsers);

// Sinle user
userRouter.get("/profile/:id",isLogin, singleUser);

// Update user
userRouter.put("/profile/:id", updateUser);


// update password
userRouter.put("/profile/update-password", isLogin, updatePasswordCtrl);

// Get/api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfileCtrl);

// following
userRouter.get("/following/:id", isLogin, followingCtrl);

// Get/api/v1/users/following/:id
userRouter.get("/unfollowing/:id", isLogin, unFollowCtrl);

// Get/api/v1/users/following/:id
userRouter.get("/block/:id", isLogin, blockedUserCtrl);

// Get/api/v1/users/unblock/:id
userRouter.get("/unblocked/:id", isLogin, unBlockedUserCtrl);


// Get/api/v1/users/delete user/:id
  userRouter.delete("/profile/", isLogin, deleteUserCtrl);

// Put/api/v1/users/following/:id
userRouter.put("/admin-block/:id", isLogin, adminBlockUserCtrl);

// Put/api/v1/users/following/:id
userRouter.put("/admin-unblock/:id", isLogin, adminUnBlockUserCtrl);

// POST/api/v1/user/profile-photo-upload
userRouter.post("/profile-upload",
  isLogin,
  upload.single("profile"),
 profilePhotoUploadCtrl,
);


module.exports = userRouter;

