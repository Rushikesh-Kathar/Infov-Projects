import * as dotenv from 'dotenv';
dotenv.config();

import express from "express";
import inventoryRoutes from "../src/routes/inventory.routes";

const app = express();
app.use(express.json());

app.use("/bff", inventoryRoutes);
console.log("ENV:", process.env.INVENTORY_SERVICE_URL);
app.listen(6001, () => console.log("Inventory BFF running on port 6001"));