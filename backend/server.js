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

//routes for the profiles
app.use("/api/posts", require("./routes/postRoutes"));

//use the errorhandler middler
app.use(errorHandler);

//listen to a specified port in .env file
app.listen(port, () => console.log(`Server started on port ${port}`));
