import express from "express";
import enquiryRoutes from "./routes/enquiryRoutes";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use("/bff", enquiryRoutes);

app.listen(5000, () => console.log("Enquiry BFF running on port 5000"));