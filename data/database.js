import mongoose from "mongoose";

export const connectDB = ()=>{
mongoose
.connect(process.env.MONGO_URI, {
})
  .then((c) => {
    console.log(`Database is Connected with ${c.connection.host}`);
  })
  .catch((e) => {
    console.log("Something went wrong", e);
  });
}