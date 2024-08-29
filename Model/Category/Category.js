const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
      title: {
          type: String,
          required: [true, "category title is required"],
      },
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "user is required"],
      },
  },
      {
        timestamps: true,
      },
      {

      }
);
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;