import { Router } from "express";
import { createEnquiry, getCarModels, getEnquiries, getEnquiryBySearch, getEnquiryById, updateEnquiryById, deleteEnquiryById } from "../controllers/enquiryController";

const router = Router();

router.post("/enquiry", createEnquiry);
router.get("/enquiries", getEnquiries);
router.get("/car-models", getCarModels);
router.get("/enquiries/search", getEnquiryBySearch);
router.get("/enquiries/:id", getEnquiryById);
router.patch('/enquiry/:id', updateEnquiryById);
router.delete('/enquiry/:id', deleteEnquiryById);

export default router;