import { ulid } from 'ulid';
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { conn } from '../config/db.js';

interface inventoryData {
    car_model_id: string,
    vin_number: string,
    color: string,
    manufacture_year: Number,
    variant: string,
    status: string

}

export const createInventoriesService = async (inventoryData: inventoryData) => {
    const { car_model_id,
        vin_number,
        color,
        manufacture_year,
        variant,
        status } = inventoryData;

    if (!car_model_id || !vin_number || !color || !manufacture_year || !variant || !status) {
        throw new Error('Missing required fields');
    }
    const connection = await conn.getConnection();
    try {
        await connection.beginTransaction();

        const [existing] = await connection.query<RowDataPacket[]>(
            'SELECT id FROM inventory WHERE car_model_id = ?',
            [car_model_id]
        );

        if (existing.length > 0) {
            throw new Error('Inventory already present');
        }


        const id = ulid();

        await connection.query<ResultSetHeader>(
            'INSERT INTO inventory (id, car_model_id, vin_number, color, manufacture_year, variant, status) VALUES (?,?,?,?,?,?,?)',
            [id, car_model_id,
                vin_number,
                color,
                manufacture_year,
                variant,
                status]

        );


        await connection.commit();
        console.log('Transaction committed successfully');



    } catch (err: any) {
        await connection.rollback();
        console.error('DB ERROR:', err);
        console.error('SQL Message:', err.sqlMessage);
        console.error('SQL State:', err.sqlState);
        console.error('Error Code:', err.code);
        throw err;
    } finally {
        connection.release();
    }

}

export const getInventoriesService = async () => {
    const connection = await conn.getConnection();
    try {
        const [rows] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM inventory'
        )
        if (rows.length === 0) {
            throw new Error('No inventories found');
        }
        return rows;
    }
    catch (err: any) {
        await connection.rollback();
        console.error('DB ERROR:', err);
        console.error('SQL Message:', err.sqlMessage);
        console.error('SQL State:', err.sqlState);
        console.error('Error Code:', err.code);
        throw err;
    } finally {
        connection.release();
    }
}

export const getInventoryByIdService = async (id: string) => {
    const connection = await conn.getConnection();

    try {
        const [rows] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM inventory where id=?',
            [id]
        )
        if (rows.length === 0) {
            throw new Error('No inventories found');
        }
        return rows;

    }
    catch (err: any) {
        await connection.rollback();
        console.error('DB ERROR:', err);
        console.error('SQL Message:', err.sqlMessage);
        console.error('SQL State:', err.sqlState);
        console.error('Error Code:', err.code);
        throw err;
    } finally {
        connection.release();
    }

}

export const updateInventoryService = async (id: string, inventoryData: inventoryData) => {
    const connection = await conn.getConnection();
    try {
        const fields: string[] = [];
        const values: any[] = [];

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

        const [result]: any = await connection.execute(query, values);

        if (result.affectedRows === 0) {
            throw new Error("User not found");
        }

        const [rows]: any = await connection.execute(
            "SELECT  car_model_id,vin_number,color,manufacture_year,variant,status  FROM inventory WHERE id = ?",
            [id]
        );

        return rows[0];


    }
    catch (err: any) {
        await connection.rollback();
        console.error('DB ERROR:', err);
        console.error('SQL Message:', err.sqlMessage);
        console.error('SQL State:', err.sqlState);
        console.error('Error Code:', err.code);
        throw err;
    } finally {
        connection.release();
    }
}

export const deleteInventoryService = async (id: string) => {
    const connection = await conn.getConnection();

    try {
        const [result]: any = await connection.execute(
            "DELETE FROM inventory WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error("Inventory not found");
        }

        return true;
    } finally {
        connection.release();
    }
};
