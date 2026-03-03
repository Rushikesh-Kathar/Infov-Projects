"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const inventory_routes_1 = __importDefault(require("./routes/inventory.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 7000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", inventory_routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map