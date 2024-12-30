import asyncHandler from "express-async-handler";
import Profile from "../models/ProfileModels.js";
import User from "../models/userModels.js";

//@desc Get Profiles
//@Route GET /api/profiles
//@acess public
export const viewProfiles = asyncHandler(async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error("Eror getting  profiles", error);
    res.status(500).json({ message: "Server error getting profiles" });
  }
});

// @desc Create profile
// @Route POST /api/profiles
// @access private
export const createProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.create({
      name: req.body.name,
      username: req.body.username,
      user: req.user.id,
    });
    res.status(201).json(profile);
  } catch (error) {
    console.error("Error creating profile", error);
    res.status(500).json({ message: "Server error creating profile" });
  }
});

//@desc Update Profiles
//@Route PUT  /api/profiles/:id
//@acess private
export const updateProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      res.status(400);
      throw new Error("Profile not found");
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedProfile);
  } catch (error) {
    console.error("Eror updating profile", error);
    res.status(500).json({ message: "Server error updating  profiles" });
  }
});

//@desc Delete Profile
//@Route DELETE /api/profiles/:id
//@access private
export const deleteProfile = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);

    if (!profile) {
      res.status(400);
      throw new Error("Profile not found");
    }

    res.json({ message: "Profile deleted", id: req.params.id });
  } catch (error) {
    console.error("Eror deleting profile", error);
    res.status(500).json({ message: "Server deleting creating  profiles" });
  }
});
