const express = require("express");
const router = express.Router();
const {
  viewUsers,
  registerUser,
  loginUser,
  getuser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

//Route to get and register users
router.route("/").get(viewUsers).post(registerUser);

//Route to login user
router.route("/login").post(loginUser);

//Route to get user data
router.route("/me").get(protect, getuser);

//Route to update  and and delete profiles
router.route("/:id").put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
