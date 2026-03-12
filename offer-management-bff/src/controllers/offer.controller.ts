import { Request, Response } from "express";
import axios from "axios";
import { createOfferService, getAllOffersService, getOfferBySearchService, getOfferByIdService, updateOfferByIdService, deleteOfferByIdService, activateOfferByIdService, deactivateOfferByIdService, expiryOfferByIdService } from "../services/offer.service";

export const createOffer = async (req: Request, res: Response) => {
    try {
        const offer = await createOfferService(req.body);
        console.log("offer", offer);
        return res.status(201).json({
            success: true,
            offer
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Offer service error",
            });
        }
        return res.status(500).json({ message: "Offer creation failed" });
    }
}

export const getAllOffers = async (req: Request, res: Response) => {
    try {
        const offers = await getAllOffersService();
        return res.status(200).json({
            success: true,
            offers
        })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Offer service error",
            });
        }
        return res.status(500).json({ message: "Offer retrival failed" });
    }
}

export const getOfferBySearch = async (req: Request, res: Response) => {
    try {

        const offers = await getOfferBySearchService(req.body);
        return res.status(200).json({
            success: true,
            offers
        })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Offer service error",
            });
        }
        return res.status(500).json({ message: "Offer search failed" });
    }

}

export const getOfferById = async (req: Request, res: Response) => {
    try {
        const offerId = req.params.id;
        if (!offerId || Array.isArray(offerId)) {
            return res.status(400).json({ message: "Invalid offer Id" });
        }
        const offer = await getOfferByIdService(offerId);
        return res.status(200).json({
            success: true,
            offer
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Offer service error",
            });
        }
        return res.status(500).json({ message: "Offer search failed" });
    }
}

export const updateOfferById = async (req: Request, res: Response) => {
    try {
        const offerId = req.params.id;
        if (!offerId || Array.isArray(offerId)) {
            return res.status(400).json({ message: "Invalid offer Id" });
        }

        const offer = await updateOfferByIdService(offerId, req.body);
        return res.status(200).json({
            success: true,
            offer
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Offer service error",
            });
        }
        return res.status(500).json({ message: "Offer update failed" });
    }
}


export const deleteOfferById = async (req: Request, res: Response) => {
    try {
        const offerId = req.params.id;
        if (!offerId || Array.isArray(offerId)) {
            return res.status(400).json({ message: "Invalid offer Id" });
        }
        const offerDeleted = await deleteOfferByIdService(offerId);
        return res.status(200).json({
            success: true,
            offerDeleted
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Offer service error",
            });
        }
        return res.status(500).json({ message: "Offer update failed" });
    }
}

export const activateOfferById = async (req: Request, res: Response) => {
    try {
        const offerId = req.params.id;
        if (!offerId || Array.isArray(offerId)) {
            return res.status(400).json({ message: "Invalid offer Id" });
        }
        const offerActivated = await activateOfferByIdService(offerId);
        return res.status(200).json({
            success: true,
            offerActivated
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Offer service error",
            });
        }
        return res.status(500).json({ message: "Offer activate failed" });
    }
}

export const deactivateOfferById = async (req: Request, res: Response) => {
    try {
        const offerId = req.params.id;
        if (!offerId || Array.isArray(offerId)) {
            return res.status(400).json({ message: "Invalid offer Id" });
        }
        const offerDeactivated = await deactivateOfferByIdService(offerId);
        return res.status(200).json({
            success: true,
            offerDeactivated
        })

    } catch (error) {
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Offer service error",
            });
        }
        return res.status(500).json({ message: "Offer deactivate failed" });
    }
}


export const expireOfferById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            res.status(400).json({ message: 'Invalid offer ID' });
            return;
        }
        const result = await expiryOfferByIdService(id);
        res.status(200).json({
            success: true,
            message: "Offer status updated if expired",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}