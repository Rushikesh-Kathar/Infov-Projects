"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryService = exports.updateInventoryService = exports.getInventoryByIdService = exports.getInventoriesService = exports.createInventoriesService = void 0;
const ulid_1 = require("ulid");
const db_js_1 = require("../config/db.js");
const createInventoriesService = async (inventoryData) => {
    const { car_model_id, vin_number, color, manufacture_year, variant, status } = inventoryData;
    if (!car_model_id || !vin_number || !color || !manufacture_year || !variant || !status) {
        throw new Error('Missing required fields');
    }
    const connection = await db_js_1.conn.getConnection();
    try {
        await connection.beginTransaction();
        const [existing] = await connection.query('SELECT id FROM inventory WHERE car_model_id = ?', [car_model_id]);
        if (existing.length > 0) {
            throw new Error('Inventory already present');
        }
        const id = (0, ulid_1.ulid)();
        await connection.query('INSERT INTO inventory (id, car_model_id, vin_number, color, manufacture_year, variant, status) VALUES (?,?,?,?,?,?,?)', [id, car_model_id,
            vin_number,
            color,
            manufacture_year,
            variant,
            status]);
        await connection.commit();
        console.log('Transaction committed successfully');
    }
    catch (err) {
        await connection.rollback();
        console.error('DB ERROR:', err);
        console.error('SQL Message:', err.sqlMessage);
        console.error('SQL State:', err.sqlState);
        console.error('Error Code:', err.code);
        throw err;
    }
    finally {
        connection.release();
    }
};
exports.createInventoriesService = createInventoriesService;
const getInventoriesService = async () => {
    const connection = await db_js_1.conn.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM inventory');
        if (rows.length === 0) {
            throw new Error('No inventories found');
        }
        return rows;
    }
    catch (err) {
        await connection.rollback();
        console.error('DB ERROR:', err);
        console.error('SQL Message:', err.sqlMessage);
        console.error('SQL State:', err.sqlState);
        console.error('Error Code:', err.code);
        throw err;
    }
    finally {
        connection.release();
    }
};
exports.getInventoriesService = getInventoriesService;
const getInventoryByIdService = async (id) => {
    const connection = await db_js_1.conn.getConnection();
    try {
        const [rows] = await connection.query('SELECT * FROM inventory where id=?', [id]);
        if (rows.length === 0) {
            throw new Error('No inventories found');
        }
        return rows;
    }
    catch (err) {
        await connection.rollback();
        console.error('DB ERROR:', err);
        console.error('SQL Message:', err.sqlMessage);
        console.error('SQL State:', err.sqlState);
        console.error('Error Code:', err.code);
        throw err;
    }
    finally {
        connection.release();
    }
};
exports.getInventoryByIdService = getInventoryByIdService;
const updateInventoryService = async (id, inventoryData) => {
    const connection = await db_js_1.conn.getConnection();
    try {
        const fields = [];
        const values = [];
        if (inventoryData.car_model_id) {
            fields.push("car_model_id = ?");
            values.push(inventoryData.car_model_id);
        }
        if (inventoryData.vin_number) {
            fields.push("vin_number = ?");
            values.push(inventoryData.vin_number);
        }
        if (inventoryData.color) {
            fields.push("color = ?");
            values.push(inventoryData.color);
        }
        if (inventoryData.manufacture_year) {
            fields.push("manufacture_year = ?");
            values.push(inventoryData.manufacture_year);
        }
        if (inventoryData.variant) {
            fields.push("variant = ?");
            values.push(inventoryData.variant);
        }
        if (inventoryData.status) {
            fields.push("status = ?");
            values.push(inventoryData.status);
        }
        if (fields.length === 0) {
            throw new Error("No fields to update");
        }
        const query = `UPDATE inventory SET ${fields.join(", ")} WHERE id = ?`;
        values.push(id);
        const [result] = await connection.execute(query, values);
        if (result.affectedRows === 0) {
            throw new Error("User not found");
        }
        const [rows] = await connection.execute("SELECT  car_model_id,vin_number,color,manufacture_year,variant,status  FROM inventory WHERE id = ?", [id]);
        return rows[0];
    }
    catch (err) {
        await connection.rollback();
        console.error('DB ERROR:', err);
        console.error('SQL Message:', err.sqlMessage);
        console.error('SQL State:', err.sqlState);
        console.error('Error Code:', err.code);
        throw err;
    }
    finally {
        connection.release();
    }
};
exports.updateInventoryService = updateInventoryService;
const deleteInventoryService = async (id) => {
    const connection = await db_js_1.conn.getConnection();
    try {
        const [result] = await connection.execute("DELETE FROM inventory WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            throw new Error("Inventory not found");
        }
        return true;
    }
    finally {
        connection.release();
    }
};
exports.deleteInventoryService = deleteInventoryService;
//# sourceMappingURL=inventory.services.js.map