//import all the depedencies
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 8000;

//Call the connect db function
connectDB();

//create an express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes for the posts
app.use("/api/posts", require("./routes/postRoutes"));

//routes for the profile
app.use("/api/profiles", require("./routes/profileRoutes"));

//routes for the users
app.use("/api/users", require("./routes/userRoutes"));

//use the errorhandler middler
app.use(errorHandler);

//listen to a specified port in .env file
app.listen(port, () => console.log(`Server started on port ${port}`));
