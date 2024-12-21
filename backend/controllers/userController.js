const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");

//@desc Get Users
//@Route GET /api/users
//@acess public
const viewUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//@desc Get User
//@Route GET /api/users/me
//@acess private
const getuser = asyncHandler(async (req, res) => {
  const { _id, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    email: email,
  });
});

//@desc Register User
//@Route Post /api/users
//@acess public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check if emaiil and password exists
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User aready exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Authenicate  User
//@Route Post /api/users/login
//@acess public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check user
  const user = await User.findOne({ email });

  //check if password and email is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//@desc Update User
//@Route PUT  /api/user/:id
//@acess private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedUser);
});

//@desc Delete User
//@Route DELETE /api/user/:id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  res.json({ message: "User deleted", id: req.params.id });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  viewUsers,
  registerUser,
  loginUser,
  getuser,
  updateUser,
  deleteUser,
};
