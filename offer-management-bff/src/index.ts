import express from "express";
import offerRoutes from "../src/routes/offer.routes";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use("/bff", offerRoutes);

app.listen(6000, () => console.log("Offer BFF running on port 6000"));