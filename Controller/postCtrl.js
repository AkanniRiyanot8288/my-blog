const Post = require("../Model/Post/Post");
const appErr = require("../utils/appErr");
const User = require("../model/User/User");

// 
const createPostCtrl = async (req, res,next) => {
    const {title, description,category} = req.body;
    try{

      // find the user
      const author = await User.findById(req.userAuth);
      // Check if user is blocked
      if (author.isBlocked) {
        return next(appErr("Access denied, account blocked", 403))
      }
      // check if title already taken
      const postTitle = await Post.findOne({ title })
      if(postTitle){
        return next(appErr(`${title} already exists`, 403))
      }
      // create the post
      const postCreated = await Post.create({
        title,
        description,
        category,
        user:author._id
      });
      // Associate user to post push the post into posts
      author.post.push(postCreated);
      await author.save();
      res.json({
        status: "sucess",
        data: postCreated,
      });
    }catch (error) {
      res.json(error.message);
    }
};


//Single Post
const singlePostCtrl = async (req, res,next) => {
  
  try {
    const post = await Post.findById(req.params.id);
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//All posts
const fetchallPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("user")
      // check if the user is blocked by the post owner
      const filteredPosts = posts.filter((post) => {
                // get all blocked users     
        
        const blockedUsers = post.user.blocked;       
        
        const isBlocked = blockedUsers.includes(req.userAuth)
        return !isBlocked;
      }) 
    res.json({
      status: "success",
      data: filteredPosts,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Delete post
const deletePostCtrl = async (req, res, next) => {
  try {
    // Find the post to be deleted
    const post = await Post.findById(req.params.id);
     if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this post",403))
     }
     await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "sucess",
      data: "Post deleted successfully",
    });
  }catch (error){
    next(appErr(error.message));
  }
};

// update post
const updatePost = async (req, res, next) => {
  const { title, description, category } = req.body;
    try {
      if (Post.user.toString() !== req.userAuth.toString()) {
        return next(appErr ("you already have this description"))
      } 
      
        const updatePostpost = await Post.findByIdAndUpdate(
            req.param.id,
            { title, description, category, photo:req?.file?.path },
            { new: true, runValidators: true }
        );
        
        res.json({
            status: "success",
            data: updated,
        });
    }   catch (error) {
         next(appErr(error.message));
    }
};

// toggle like
const toggleLikesCtrl =async (req, res, next) => {
  try {
      // get the post you want to like
      const post = await Post.findById(req.params.id);
      // Check if the user already disliked the post
      const isDisliked = post.dislikes.includes(req.userAuth);
      // check if user already Like the post
      const isLiked = post.likes.includes(req.userAuth);
      // If the user already like the post, Unlike the post

    if (isDisliked) {
      return next(
        appErr("You have already disliked this post, Unlike to like the post")
      );
    } else {
      if(isLiked) {
        post.likes = post.likes.filter(like => like.toString() !== req.userAuth.toString())
        await post.save()
      }else {
        // if the user has not liked the post, like the post
        post.likes.push(req.userAuth);
        await post.save();
      }
      res.json({
        status: "success",
        data: post,
      });
    }

  }catch (error) {
    next((error.message));
  }
};

// toggle Dislike
const toggleDisLikesCtrl =async (req, res, next) => {
  try {
      // get the post you want to dislike
      const post = await Post.findById(req.params.id);
      // Check if the user already liked the post
      const isLiked = post.likes.includes(req.userAuth);
      // check if user already DisLike the post
      const isDisLiked = post.dislikes.includes(req.userAuth);
      // If the user already dislike the post, Undislike the post

    if (isLiked) {
      return next(
        appErr("You have already liked this post, dislike to like the post", 403)
      );
    } else {
      if(isDisLiked) {
        post.dislikes = post.dislikes.filter(dislike => dislike.toString() !== req.userAuth.toString());
        await post.save()
      }else {
        // if the user has not disliked the post, like the post
        post.dislikes.push(req.userAuth);
        await post.save();
      }
      res.json({
        status: "success",
        data: post,
      });
    }

  }catch (error) {
    next((error.message));
  }
};

// Post Details
const postDetailsCtrl = async (req, res, next) => {
  try {
    // find the post
    const post = await Post.findById(req.params.id);
    // Number of view
    // check if the user vieewed this post
    const isViewed =  post.numViews.includes(req.userAuth);
    if (isViewed) {
      res.json({
        status: "success",
        data: post,
      });
    }else{
      //push into numview
      post.numViews.push(req.userAuth)
      await post.save()
      res.json({
        status: "success",
        data: post,
      });

    }
  } catch (error) {
    next(appErr(error.message));
  }
};


module.exports = {
  createPostCtrl,
  deletePostCtrl,
  singlePostCtrl,
  fetchallPosts,
  updatePost,
  toggleLikesCtrl,
  toggleDisLikesCtrl,
  postDetailsCtrl,
}
