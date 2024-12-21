const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: [true, "Please add your personal details"],
    },

    username: {
      type: String,
      required: [true, "Please add your personal details"],
      unique: true,
    },

    education: [
      {
        type: String,
        required: false,
      },
    ],

    workExperience: [
      {
        type: String,
      },
    ],

    githubRepositories: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
