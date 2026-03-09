import { Request, Response } from "express";
import { createEnquiryService, getEnquiriesService, getCarModelsService, getEnquiriesBySearchService, getEnquiriesByIdService, updateEnquiriyByIdService, deleteEnquiriyByIdService } from "../services/enquiryService"
import axios from "axios"

export const createEnquiry = async (req: Request, res: Response) => {
    try {
        const user = await createEnquiryService(req.body);
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
}

export const getEnquiries = async (req: Request, res: Response) => {
    try {
        const enquiries = await getEnquiriesService(req.body);
        console.log(enquiries);
        return res.status(200).json({
            success: true,
            enquiries
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "User service error",
            });
        }
        return res.status(500).json({ message: "Registration failed" });
    }
}

export const getCarModels = async (req: Request, res: Response) => {
    try {
        const carModels = await getCarModelsService(req.body);
        return res.status(200).json({
            success: true,
            carModels
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "User service error",
            });
        }
        return res.status(500).json({ message: "Registration failed" });
    }
}

export const getEnquiryBySearch = async (req: Request, res: Response) => {
    try {
        const getEnquiriesBySearch = await getEnquiriesBySearchService(req.body);
        return res.status(200).json({
            success: true,
            getEnquiriesBySearch
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "User service error",
            });
        }
        return res.status(500).json({ message: "Registration failed" });
    }
}

export const getEnquiryById = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        console.log(id);
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID parameter" });
        }
        const getEnquiriyById = await getEnquiriesByIdService(id);
        return res.status(200).json({
            success: true,
            getEnquiriyById
        });


    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "User service error",
            });
        }
        return res.status(500).json({ message: "Registration failed" });
    }
}

export const updateEnquiryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID parameter" });
        }
        const updateEnquiriyById = await updateEnquiriyByIdService(id);
        return res.status(200).json({
            success: true,
            updateEnquiriyById
        });


    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "User service error",
            });
        }
        return res.status(500).json({ message: "Registration failed" });
    }
}

export const deleteEnquiryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "Invalid ID parameter" });
        }
        const deleteEnquiriyById = await deleteEnquiriyByIdService(id);
        return res.status(200).json({
            success: true,
            deleteEnquiriyById
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "User service error",
            });
        }
        return res.status(500).json({ message: "Registration failed" });
    }
}