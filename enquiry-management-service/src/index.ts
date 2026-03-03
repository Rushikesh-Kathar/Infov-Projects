import express, { Express } from "express";
import dotenv from "dotenv";
import enquiryRouter from "./routes/enquiry.routes";

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", enquiryRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

