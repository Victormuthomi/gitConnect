const express = require("express");
const router = express.Router();
const {
  viewProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/ProfileController");
const { protect } = require("../middleware/authMiddleware");

//Route to get and profile requests
router.route("/").get(viewProfiles).post(protect, createProfile);

//Route to update  and and delete profiles
router.route("/:id").put(protect, updateProfile).delete(protect, deleteProfile);

module.exports = router;
