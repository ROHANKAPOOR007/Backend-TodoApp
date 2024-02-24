import { app } from "./app.js";
import { connectDB } from "./data/database.js";

//database called
connectDB();



// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode `);
});
