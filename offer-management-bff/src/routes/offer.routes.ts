import { Router } from "express";
import { createOffer, getAllOffers, getOfferBySearch, getOfferById, updateOfferById, deleteOfferById, activateOfferById, deactivateOfferById, expireOfferById } from "../controllers/offer.controller"

const router = Router();

router.post("/offer", createOffer);
router.get("/offer", getAllOffers);
router.get('/offer/search', getOfferBySearch);
router.get('/offer/:id', getOfferById);
router.patch('/offer/:id', updateOfferById);
router.delete('/offer/:id', deleteOfferById);
router.patch('/offers/:id/activate', activateOfferById);
router.patch('/offers/:id/deactivate', deactivateOfferById);
router.patch('/offers/:id/expire', expireOfferById);



export default router;