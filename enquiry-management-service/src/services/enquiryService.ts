import { ulid } from 'ulid';
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { conn } from '../config/db.js';

interface enquiryData {
    cust_id: string,
    budget: Number,
    carModel: string,
    message: string,
    contactNumber: Number

}
interface SearchEnquiryParams {
    cust_id?: string;
    carModel?: string;
    budget?: number;
    contactNumber?: number;
}

export const enquiryCustomer = async (enquiryData: enquiryData) => {
    const { cust_id,
        budget,
        carModel,
        message,
        contactNumber } = enquiryData;

    if (!cust_id || !budget || !carModel ||
        !contactNumber
    ) {
        throw new Error('Missing required fields');
    }
    const connection = await conn.getConnection();
    try {
        await connection.beginTransaction();

        const [existing] = await connection.query<RowDataPacket[]>(
            'SELECT id FROM enquiries WHERE cust_id = ?',
            [cust_id]
        );

        if (existing.length > 0) {
            throw new Error('Customer already present');
        }


        const userId = ulid();

        await connection.query<ResultSetHeader>(
            'INSERT INTO enquiries (id, cust_id, budget, carModel, message, contactNumber) VALUES (?,?,?,?,?,?)',
            [userId, cust_id,
                budget,
                carModel,
                message,
                contactNumber]
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

export const getEnquiries = async () => {
    const connection = await conn.getConnection();
    try {
        const [enquires] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM enquiries'
        );
        if (enquires.length === 0) {
            throw new Error('No enquiries found');
        }
        return enquires;
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

export const getCarModels = async () => {
    const connection = await conn.getConnection();
    try {
        const [enquires] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM car_models'
        );
        return enquires;
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
// /api/enquiries/{id}
export const getEnquiryById = async (id: string) => {
    const connection = await conn.getConnection();
    try {
        const [enquires] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM enquiries WHERE id=?',
            [id]
        )
        if (enquires.length == 0) {
            throw new Error('Enquiry not found');
        }
        return enquires;

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

export const getEnquiryBySearch = async (params: SearchEnquiryParams) => {
    const connection = await conn.getConnection();
    try {
        const { cust_id, carModel, budget, contactNumber } = params;
        let query = 'SELECT * FROM enquiries WHERE 1=1';
        const values: any[] = [];

        if (cust_id) {
            query += ' AND cust_id = ?';
            values.push(cust_id);
        }
        if (carModel) {
            query += ' AND carModel = ?';
            values.push(carModel);
        }
        if (budget !== undefined && budget !== null) {
            query += ' AND budget = ?';
            values.push(budget);
        }
        if (contactNumber !== undefined && contactNumber !== null) {
            query += ' AND contactNumber = ?';
            values.push(contactNumber);
        }

        const [enquires] = await connection.query<RowDataPacket[]>(query, values);
        console.log(enquires);
        return enquires;
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

export const updateEnquiryService = async (
    user_id: string,
    enquiryData: enquiryData
) => {
    const connection = await conn.getConnection();

    try {
        const fields: string[] = [];
        const values: any[] = [];

        if (enquiryData.cust_id) {
            fields.push("cust_id = ?");
            values.push(enquiryData.cust_id);
        }

        if (enquiryData.budget) {
            fields.push("budget = ?");
            values.push(enquiryData.budget);
        }

        if (enquiryData.carModel) {
            fields.push("carModel = ?");
            values.push(enquiryData.carModel);
        }

        if (enquiryData.message) {
            fields.push("message = ?");
            values.push(enquiryData.message);
        }

        if (enquiryData.contactNumber) {
            fields.push("contactNumber = ?");
            values.push(enquiryData.contactNumber);
        }


        if (fields.length === 0) {
            throw new Error("No fields to update");
        }

        const query = `UPDATE enquiries SET ${fields.join(", ")} WHERE id = ?`;
        values.push(user_id);

        const [result]: any = await connection.execute(query, values);

        if (result.affectedRows === 0) {
            throw new Error("User not found");
        }

        const [rows]: any = await connection.execute(
            "SELECT  cust_id, budget, carModel,message,contactNumber FROM enquiries WHERE id = ?",
            [user_id]
        );

        return rows[0];
    } finally {
        connection.release();
    }
};


export const deleteEnquiryService = async (custId: string) => {
    const connection = await conn.getConnection();

    try {
        const [result]: any = await connection.execute(
            "DELETE FROM enquiries WHERE id = ?",
            [custId]
        );

        if (result.affectedRows === 0) {
            throw new Error("Enquiry not found");
        }

        return true;
    } finally {
        connection.release();
    }
};

