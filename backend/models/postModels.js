const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    text: { type: String, required: [true, "Please add text"] },

    //like: { type: Number, default: 0 },
    //dislike: { type: Number, default: 0 },
    //comments: [{ type: String, required: false }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);

//like: { type: Number, default: 0 },
//  dislike: { type: Number, default: 0 },
//comments: [{ type: String, required: false }],
