import { Request, Response } from "express";
import { createUser, login, getUser, updateUser, deleteUser } from "../services/user.service";
import axios from "axios";

export const registerUser = async (req: Request, res: Response) => {
    try {
        console.log("Registerisdfasdfng user with data:", req.body);
        const user = await createUser(req.body);
        return res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "User service error",
            });
        }
        return res.status(500).json({ message: "Registration failed" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const token = await login(req.body);
    res.json({ token });
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req.body);
        const formattedUser = {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email_address
        };
        return res.status(201).json({
            success: true,
            formattedUser
        });
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "User service error",
            });
        }
        return res.status(500).json({ message: "Registration failed" });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id; // get id from route
        if (!userId || Array.isArray(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        const updatedUser = await updateUser(userId, req.body);

        return res.status(200).json({
            success: true,
            data: updatedUser,
        });
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                success: false,
                message: error.response?.data?.message || "User service error",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        if (!userId || Array.isArray(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }

        await deleteUser(userId);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                success: false,
                message: error.response?.data?.message || "User service error",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};