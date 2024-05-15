import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from './db/dbConnection.js';
import messageRouter from "./Router/MessageRouter.js"
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

const app = express();
config({path: "./config/config.env"})

// FrentedCannectionWIthBackend........
app.use(cors({
    origin: [process.env.FRONTEN_URL, process.env.DASHBORD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


//Middleware
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/"
}));

//dbConnection.........
dbConnection();

//routess
app.use("/api/v1/user", messageRouter)


app.use(errorMiddleware)
export default app;