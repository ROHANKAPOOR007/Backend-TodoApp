import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"; // Import jsonwebtoken package

export const isAuthenticated = async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
      return res.status(404).json({
        success: false,
        message: "Not LoggedIn"
      });
    };
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    next();
}