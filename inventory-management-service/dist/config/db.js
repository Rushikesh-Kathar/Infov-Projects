"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const poolOptions = {
    connectionLimit: parseInt(process.env.CONNECTIONLIMIT || '10', 10),
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || ''
};
exports.conn = promise_1.default.createPool(poolOptions);
exports.conn.getConnection()
    .then((connection) => {
    console.log('DB connected successfully!');
    connection.release();
})
    .catch((err) => {
    console.error('DB connection failed:', err);
    process.exit(1);
});
//# sourceMappingURL=db.js.map