const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
   title:{
      type: String,
      required: [true, "post title is required"],
      trim: true,
   },
   description:{
      type: String,
      required: [true, "post description is required"],

   },
   category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "post category is required"],

   }, 
   numViews:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
   
   },
   ], 
   likes:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",

   },
   ], 
   dislikes:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      
      }, 
   ],
   comments:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment",
      
      }, 
   ],
   user:{
   type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: [true, "User is required"],
   },
   photo: {
      type: String,
   },
},{
   timestamps: true,
   toJSON: { virtuals: true },
   });

   

postSchema.pre(/^find/, function (next) {
   // add views count as virtual field
   postSchema.virtual("viewCount").get(function () {
      const post = this;
      return post.numViews.length;
   });
   // add likes count as virtual field
   postSchema.virtual("likesCount").get(function () {
      const post = this;
      return post.likes.length;
   });
   // // add dislike count as virtual field
   postSchema.virtual("disLikeCount").get(function () {
      const post = this;
      return post.dislikes.length;
   });
      // check the most like post in percentage
      postSchema.virtual("likePercentage").get(function () {
      const post = this;
      const total = +post.likes.length + +post.dislikes.length;
      const percentage = Math.floor((post.likes.length / total) * 100);
      return `${percentage}%`;
   });

   // check the most most disliked post in percentage
   postSchema.virtual("disLikePercentage").get(function () {
      const post = this;
      const total = +post.likes.length + +post.dislikes.length;
      const percentage = Math.floor((post.likes.length / total) * 100);
      return `${percentage}%`;
   });

   // if day is less than 0 return Today, if day is 1 return Yesterday else return days ago
   postSchema.virtual("daysAgo").get(function () {
   const post = this;
   const date = new Date(post.createdAt);
   const daysAgo = Math.floor((Date.now() - date) / 86400000);
   return daysAgo === 0
   ? "Today"
   : daysAgo === 1
   ? "Yesterday"
   : `${daysAgo} days ago`;
   });
   next()
})


const Post = mongoose.model("Post",postSchema);

module.exports = Post;