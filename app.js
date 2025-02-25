import express from "express";
import cors from "cors"; 
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("connection error", error);
});

connection.once("open", () => {
    console.log("Connected to database successfully");
});

const app = express();


app.use(cors());

app.use(express.json());
routes(app);

export default app;