import { Request, Response } from 'express';
import { createInventoryService, getInventoriesService, getInventoryByIdService, updateInventoryByIdService, deleteInventoryByIdService } from '../services/inventory.services'
import axios from "axios"

export const createInventory = async (req: Request, res: Response) => {

    try {
        const result = await createInventoryService(req.body);
        return res.status(201).json({
            success: true,
            result
        });

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Inventory service error",
            });
        }
        return res.status(500).json({ error: 'Failed to create inventory' });
    }
}

export const getInventories = async (req: Request, res: Response) => {
    try {
        const result = await getInventoriesService(req.body);
        return res.status(200).json({
            success: true,
            result
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Inventory service error",
            });
        }
        return res.status(500).json({ error: 'Failed to get inventories' });
    }

}

export const getInventoryById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ error: 'Invalid inventory ID' })
        }
        const result = await getInventoryByIdService(id);
        return res.status(200).json({
            success: true,
            result
        })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Inventory service error",
            });
        }
        return res.status(500).json({ error: 'Failed to get inventory by ID' });
    }
}

export const updateInventory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ error: 'Invalid inventory ID' })
        }
        const result = await updateInventoryByIdService(id, req.body);
        return res.status(200).json({
            success: true,
            result
        })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Inventory service error",
            });
        }
        return res.status(500).json({ error: 'Failed to update inventory by ID' });
    }
}

export const deleteInventory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({ error: 'Invalid inventory ID' })
        }
        const result = await deleteInventoryByIdService(id);
        return res.status(200).json({
            success: true,
            result
        })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Inventory service error",
            });
        }
        return res.status(500).json({ error: 'Failed to delete inventory by ID' });
    }
}