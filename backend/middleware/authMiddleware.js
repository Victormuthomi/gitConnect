import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/userModels.js";

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        //get token from heaader
        token = req.headers.authorization.split(" ")[1];

        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Get user from the token
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not Authorized");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorised, No token");
    }
  } catch (error) {
    console.error("Error getting users", error);
    res.status(500).json({ message: "Server error getting  users" });
  }
});

export default protect;
