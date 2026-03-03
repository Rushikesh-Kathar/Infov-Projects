import { Request, Response } from 'express';
import { createInventoriesService, getInventoriesService, getInventoryByIdService, updateInventoryService, deleteInventoryService } from '../services/inventory.services'

export const inventoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { car_model_id, vin_number, color, manufacture_year, variant, status } = req.body;
        if (!car_model_id || !vin_number || !color || !manufacture_year || !variant || !status) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const result = await createInventoriesService({
            car_model_id,
            vin_number,
            color,
            manufacture_year,
            variant,
            status
        });


        res.status(201).json({
            message: 'Inventory created successfully',
            data: result

        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getInventoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getInventoriesService();
        res.status(200).json({
            message: 'Inventories retrieved successfully',
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getInventoryByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        if (!id || Array.isArray(id)) {
            res.status(400).json({ message: "Invalid id parameter" });
            return;
        }
        const result = await getInventoryByIdService(id);
        res.status(200).json({
            message: 'Inventory retrived Successfully',
            data: result
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const updateInventoryController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const result = await updateInventoryService(userId, req.body);
        res.status(200).json({
            message: 'Inventory updated successfully',
            data: result
        });
    }
    catch (err: any) {
        res.status(500).json({ err: err.message });
    }
}

export const deleteInventoryController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const result = await deleteInventoryService(id);
        res.status(200).json({
            message: 'Inventory deleted successfully',
            data: result
        });
    }
    catch (err: any) {
        res.status(500).json({ err: err.message });
    }
}