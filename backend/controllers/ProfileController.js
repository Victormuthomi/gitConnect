const asyncHandler = require("express-async-handler");

const Profile = require("../models/ProfileModels");
const user = require("../models/userModels");

//@desc Get Profiles
//@Route GET /api/profiles
//@acess public
const viewProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

//@desc Create Profile
//@Route Post /api/profiles
//@acess private
const createProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.create({
    name: req.body.name,
    username: req.body.username,
    user: req.user.id,
  });

  res.status(201).json(profile);
});

//@desc Update Profiles
//@Route PUT  /api/profiles/:id
//@acess private
const updateProfile = asyncHandler(async (req, res) => {
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
});

//@desc Delete Profile
//@Route DELETE /api/profiles/:id
//@access private
const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findByIdAndDelete(req.params.id);

  if (!profile) {
    res.status(400);
    throw new Error("Profile not found");
  }

  res.json({ message: "Profile deleted", id: req.params.id });
});

module.exports = {
  viewProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
};
