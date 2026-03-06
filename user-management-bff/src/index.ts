import express from "express";
import userRoutes from "./routes/user.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/bff", userRoutes);

app.listen(4000, () => console.log("User BFF running on port 4000"));