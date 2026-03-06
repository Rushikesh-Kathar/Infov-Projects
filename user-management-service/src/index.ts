import express, { Express } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 8004;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

app.listen(port, () => {
    console.log(`Server is running on port1 ${port}`);
});

