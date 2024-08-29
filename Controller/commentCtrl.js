const Comment = require("../Model/Comment/Comment");
const Post = require("../Model/Post/Post");
const User = require("../model/User/User");
const appErr = require("../utils/appErr");

// create comment
const createCommentCtrl = async (req, res, next) => {
    const { description } = req.body;
    try {
        // FIND POST
        const post = await Post.findById(req.params.id);
        // create comment

        const comment = await Comment.create({ 
            post: post._id, 
            description,
             user: req.userAuth,
            });
            // push the comment to the post
            post.comments.push(comment._id);
            //find the user
            const user = await User.findById(req.userAuth);
            // push to user list
            user.comments.push(comment._id);
            // save
            await post.save();
            await user.save();
        res.json({
            status: "sucess",
            data: comment,
        });
    }catch (error) {
        next(appErr(error.message));
    }
};

// fetch all comment

const fetchAllCommentCtrl = async (req, res, next) => {
    try {
        const comment = await Comment.find();

        res.json({
            status: "success",
            data: comment,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

//Delete comment
const deleteCommentCtrl = async (req, res, next) => {
    try {
      // Find the comment to be deleted
     const comment =   await Comment.findById(req.params.id);
       if (comment.user.toString() !== req.userAuth.toString()) {
        return next(appErr("You are not allowed to delete this comment", 403))
       }
       await Comment.findByIdAndDelete(req.param.id);
      res.json({
        status: "sucess",
        data: "Comment has been deleted successfully",
      });
    }catch (error){
      next(appErr(error.message));
    }
  };

//   single comment
const singleCommentCtrl = async (req, res, next) => {
     const comment = await Comment.findById(req.params.id);
     try {
        res.json({
            status: "sucess",
            data: comment,
        });
     } catch (error) {
        next(appErr(error.message));
     }
    };

    // update comment
    const updateComment = async (req, res, next) => {
      const { title } = req.body;
        try {
            const comment = await Comment.findByIdAndUpdate(
                req.param.id,
                { description, post},
                { new: true, runValidators: true }
            );
            res.json({
                status: "success",
                data: comment,
            });
        }   catch (error) {
             next(appErr(error.message));
        }
    };


module.exports = {
    createCommentCtrl,
    fetchAllCommentCtrl,
    deleteCommentCtrl,
    singleCommentCtrl,
    updateComment,
    
};