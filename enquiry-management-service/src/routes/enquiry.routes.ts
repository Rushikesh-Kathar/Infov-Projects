import { Router } from 'express';
import { enquiryController, getEnquiriesController, getCarModelsController, getEnquiryByIdController, getEnquiryBySearchController, updateEnquiryController, deleteUserController } from '../controllers/enquiry.controller';

const router = Router();
router.route('/enquiry').post(enquiryController);
router.route('/enquiries').get(getEnquiriesController);
router.route('/car-models').get(getCarModelsController);
router.route('/enquiries/search').get(getEnquiryBySearchController)
router.route('/enquiries/:id').get(getEnquiryByIdController);
router.route('/enquiry/:id').patch(updateEnquiryController);
router.route('/enquiry/:id').delete(deleteUserController)
export default router;