import mongoose from "mongoose";

export const connectDB = ()=>{
mongoose
.connect(process.env.MONGO_URI, {
})
  .then(() => {
    console.log("Database is Connected");
  })
  .catch((e) => {
    console.log("Something went wrong", e);
  });
}