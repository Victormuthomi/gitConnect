import mongoose from "mongoose";

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

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
