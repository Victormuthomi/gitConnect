import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";

//@desc Get Users
//@Route GET /api/users
//@acess public
export const viewUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error getting users", error);
    res.status(500).json({ message: "Server error getting  users" });
  }
});

//@desc Get User
//@Route GET /api/users/me
//@acess private
export const getuser = asyncHandler(async (req, res) => {
  try {
    const { _id, email } = await User.findById(req.user.id);

    res.status(200).json({
      id: _id,
      email: email,
    });
  } catch {
    console.error("Error getting user", error);
    res.status(500).json({ message: "Server error getting  user" });
  }
});

//@desc Register User
//@Route Post /api/users
//@acess public
export const registerUser = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ message: "Server error creating  users" });
  }
});

//@desc Authenicate  User
//@Route Post /api/users/login
//@acess public
export const loginUser = asyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error loggin in user", error);
    res.status(500).json({ message: "Server error logging in  user" });
  }
});

//@desc Update User
//@Route PUT  /api/users/:id
//@acess private
export const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ message: "Server error updating  user" });
  }
});

//@desc Delete User
//@Route DELETE /api/user/:id
//@access private
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    res.json({ message: "User deleted", id: req.params.id });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ message: "Server error deleting  users" });
  }
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
