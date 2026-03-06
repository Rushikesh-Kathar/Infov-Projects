import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService.js';
import { getAllUsers, getUserById, updateUserService, deleteUserService } from '../services/userService.js';

export const registerUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, age, password, mobile } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        console.log("body", req.body)
        const tokens = await registerUser({ name, email, age, password, mobile });

        res.status(201).json({
            message: 'User registered successfully',
            ...tokens
        });
    } catch (error: any) {
        console.error(error);

        if (error.message === 'Missing required fields' || error.message === 'Email already registered') {
            res.status(400).json({ message: error.message });
            return;
        }
        res.status(500).json({
            message: error.message,
            sqlMessage: error.sqlMessage,
            code: error.code
        });
    }
};

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const tokens = await loginUser({ email, password });

        res.status(200).json({
            message: 'Login successful',
            ...tokens
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const userGetter = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = (req as any).user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Admins get all customers, others get only their own user
        if (user.role === 'admin') {
            const result = await getAllUsers();
            res.status(200).json(result);
        } else {
            const result = await getUserById(user.id);
            res.status(200).json(result);
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export const updateUserController = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const userId = req.params.id;
        const updatedUser = await updateUserService(userId, req.body);
        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error: any) {
        if (error.message === "No fields to update") {
            res.status(400).json({ message: error.message });
            return;
        }
        if (error.message === "User not found") {
            res.status(404).json({ message: error.message });
            return;
        }
        if (error.message === "Forbidden") {
            res.status(403).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteUserController = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {

    try {
        console.log("Delete user");
        const userId = req.params.id;

        await deleteUserService(userId);
        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error: any) {
        if (error.message === "User not found") {
            res.status(404).json({ message: error.message });
            return;
        }
        if (error.message === "Forbidden") {
            res.status(403).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
};