import  express from "express";
import router from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"

export const app = express();

config({
  path: "./data/config.env"
});

//using middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));




app.use("/api/v1/users",router);
app.use("/api/v1/task",taskRouter);





app.get("/", function(req, res){
    res.send("Nice Working");
})


app.use(errorMiddleware);