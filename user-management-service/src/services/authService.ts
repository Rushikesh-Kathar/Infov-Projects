import { conn } from '../config/dbConn.js';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {
    generateAccessToken,
    generateRefreshToken
} from './auth.js';
import { ulid } from 'ulid';
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface UserData {
    name: string;
    email: string;
    age?: number;
    password: string;
    mobile?: number;

}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

interface LoginData {
    email: string;
    password: string;
}


interface UserRow extends RowDataPacket {
    id: string;
    name: string;
    email: string;
    password: string;
    age?: number;
    mobile?: string;
}

interface RoleRow extends RowDataPacket {
    roleName: string;
}

interface TokenUser extends JwtPayload {
    id: string;
    email: string;
    role?: string;
}

let refreshTokens: Array<{ userId: string; token: string }> = [];

export const registerUser = async (userData: UserData): Promise<TokenResponse> => {
    const { name, email, age, password, mobile } = userData;

    if (!name || !email || !password) {
        throw new Error('Missing required fields');
    }

    const connection = await conn.getConnection();

    try {
        await connection.beginTransaction();

        const [existing] = await connection.query<RowDataPacket[]>(
            'SELECT id FROM customers WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            throw new Error('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = ulid();

        await connection.query<ResultSetHeader>(
            'INSERT INTO customers (id, name, email, age, password, mobile) VALUES (?,?,?,?,?,?)',
            [userId, name, email, age, hashedPassword, mobile]
        );







        const tokenUser: TokenUser = {
            id: userId,
            email
        };
        const accessToken = generateAccessToken(tokenUser as any);
        const refreshToken = generateRefreshToken(tokenUser as any);

        console.log('Inserting refresh token for user:', userId, 'Token:', refreshToken);
        try {
            await connection.query<ResultSetHeader>(
                `INSERT INTO auth_tokens (id, cust_id, access_token, refresh_token)
   VALUES (?, ?, ?, ?)`,
                [ulid(), userId, accessToken, refreshToken]
            );
            console.log('Refresh token inserted successfully');
        } catch (tokenError: any) {
            console.error('Error inserting refresh token:', tokenError.message);
            console.error('Error Code:', tokenError.code);
            console.error('SQL State:', tokenError.sqlState);
            throw tokenError;
        }

        await connection.commit();
        console.log('Transaction committed successfully');

        refreshTokens.push({
            userId: userId,
            token: refreshToken
        });
        return { accessToken, refreshToken };

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
};

export const loginUser = async (userData: LoginData): Promise<TokenResponse> => {
    const { email, password } = userData;

    if (!email || !password) {
        throw new Error('Please add all fields');
    }

    const [rows] = await conn.query<UserRow[]>(
        'SELECT * FROM customers WHERE email = ?',
        [email]
    );

    if (rows.length === 0) {
        throw new Error('Invalid credentials');
    }

    const user = rows[0];
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const tokenUser: TokenUser = {
        id: user.id,
        email: user.email
    };
    const accessToken = generateAccessToken(tokenUser as any);
    const refreshToken = generateRefreshToken(tokenUser as any);

    console.log('Inserting refresh token for user:', user.id, 'Token:', refreshToken);
    try {

        await conn.query<ResultSetHeader>(
            `INSERT INTO auth_tokens (id, cust_id, access_token, refresh_token)
   VALUES (?, ?, ?, ?)`,
            [ulid(), user.id, accessToken, refreshToken]
        );
        console.log('Refresh token inserted successfully');
    } catch (insertError: any) {
        console.error('Error inserting refresh token:', insertError.message);
        console.error('Error Code:', insertError.code);
        console.error('SQL State:', insertError.sqlState);
        throw insertError;
    }

    console.log('Access token', accessToken);
    console.log('Refresh token', refreshToken);
    refreshTokens.push({
        userId: user.id,
        token: refreshToken
    });

    console.log(refreshTokens);
    return { accessToken, refreshToken };
};

