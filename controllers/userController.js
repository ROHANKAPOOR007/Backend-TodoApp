import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    sendCookie(newUser, res, "Registered Successfully", 201); // Corrected to send the newly created user
    
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res, next) => {
  // Implement the logic to handle user login
  const { email, password } = req.body;

  try {
    const user  = await User.findOne({ email }).select("+password");
    if(!user) return next(new ErrorHandler("User Doesn't Exist", 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is Incorrect",
      });
    }

    sendCookie(user, res, `Welcome back ${user.name}`, 200); // Corrected to use 'user.name' instead of 'User.name'
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMyProfile = (req, res) => {
  // Implement the logic to fetch details of a specific user
  res.status(200).json({
    success: true,
    user: req.user
  })
};

export const logout = (req, res) => {
  // Implement the logic to fetch details of a specific user
  res
  .status(200)
  .cookie("token", "",{
    expires: new Date (Date.now()),
    sameSite:process.env.NODE_ENV ==="Development" ? "lax" : "none",
    secure: process.env.NODE_ENV ==="Development" ? false : true,

  })
  .json({
    success: true,
    user: req.user
  })
  // res.clearCookie("token").status(200).json({
  //   success: true,
  //   message: "Logout successful",
  // });
};



