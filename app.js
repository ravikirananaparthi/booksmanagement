import express from "express";
import userRouter from "./routes/user.js";
import bookRouter from "./routes/book.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/errorHandling.js";
import cors from "cors";



export const app = express();

config({
  path: "./data/config.env",
});



app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


//using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/book", bookRouter);

app.get("/", (req, res) => {
  res.send("working");
});
//using error middlle ware
app.use(errorMiddleWare);
