const mongoose = require("mongoose");
// schema is use to create comment table
const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: [true, "post is required"],
    },
    user: {
          type: Object,
          required: [true, "comment description is required"]
    },
  },
  {
    timeStamps: true
  }
);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;