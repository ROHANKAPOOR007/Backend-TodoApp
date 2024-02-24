import jwt from "jsonwebtoken";
export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); // Corrected to use 'user._id' instead of 'newUser._id'

  // Set the token as a cookie in the response
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: process.env.NODE_ENV ==="Development" ? "lax" : "none",
      secure: process.env.NODE_ENV ==="Development" ? false : true,
    
    })
    .status(statusCode)
    .json({
      success: true,
      message,
    });
};
