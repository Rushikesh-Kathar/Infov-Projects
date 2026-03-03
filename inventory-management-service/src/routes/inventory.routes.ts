import { Router } from 'express';
import { inventoryController, getInventoriesController, getInventoryByIdController, updateInventoryController, deleteInventoryController } from '../controllers/inventory.controllers';
const router = Router();


router.route('/inventory').post(inventoryController);
router.route('/inventories').get(getInventoriesController);
router.route('/inventory/:id').get(getInventoryByIdController);
router.route('/inventory/:id').patch(updateInventoryController);
router.route('/inventory/:id').delete(deleteInventoryController);

export default router;