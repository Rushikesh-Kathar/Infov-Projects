import express, { Express } from "express";
import dotenv from "dotenv";
import inventoryRouter from "./routes/inventory.routes";

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", inventoryRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

