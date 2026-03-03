import { Request, Response } from 'express';
import { enquiryCustomer, getEnquiries, getCarModels, getEnquiryById, getEnquiryBySearch, updateEnquiryService, deleteEnquiryService } from '../services/enquiryService'


export const enquiryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cust_id, budget, carModel, message, contactNumber } = req.body;
        if (!cust_id || !budget || !carModel || !contactNumber) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const result = await enquiryCustomer({
            cust_id,
            budget,
            carModel,
            message,
            contactNumber
        });


        res.status(201).json({
            message: 'Enquiry created successfully',
            data: result

        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getEnquiriesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getEnquiries();
        res.status(200).json({
            message: 'Enquiries retrieved successfully',
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getCarModelsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getCarModels();
        res.status(200).json({
            message: 'Car models retrieved successfully',
            data: result
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getEnquiryByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            res.status(400).json({ message: "Invalid id parameter" });
            return;
        }
        const result = await getEnquiryById(id);
        res.status(200).json({
            message: 'Enquiry retrieved successfully',
            data: result
        });
    } catch (err: any) {
        res.status(500).json({ err: err.message });
    }
}

export const getEnquiryBySearchController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { cust_id, carModel, budget, contactNumber } = req.query;

        if (
            Array.isArray(cust_id) ||
            Array.isArray(carModel) ||
            Array.isArray(budget) ||
            Array.isArray(contactNumber)
        ) {
            res.status(400).json({ message: "Invalid query parameters" });
            return;
        }

        const data = await getEnquiryBySearch({
            cust_id: cust_id as string | undefined,
            carModel: carModel as string | undefined,
            budget: budget as number | undefined,
            contactNumber: contactNumber as number | undefined
        });
        console.log('Search results:', data);
        res.status(200).json({
            success: true,
            count: (data as any[]).length,
            data
        });

    }
    catch (err: any) {
        res.status(500).json({ err: err.message });
    }
}

export const updateEnquiryController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        const result = await updateEnquiryService(userId, req.body);
        res.status(200).json({
            message: 'Enquiry updated successfully',
            data: result
        });
    }
    catch (err: any) {
        res.status(500).json({ err: err.message });
    }
}

export const deleteUserController = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try {
        const custId = req.params.id;

        await deleteEnquiryService(custId);
        res.status(200).json({
            message: "Enquiry deleted successfully"
        });
    } catch (error: any) {
        if (error.message === "Enquiry not found") {
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