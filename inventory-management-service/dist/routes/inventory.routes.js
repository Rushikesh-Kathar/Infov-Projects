"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_controllers_1 = require("../controllers/inventory.controllers");
const router = (0, express_1.Router)();
router.route('/inventory').post(inventory_controllers_1.inventoryController);
router.route('/inventories').get(inventory_controllers_1.getInventoriesController);
router.route('/inventory/:id').get(inventory_controllers_1.getInventoryByIdController);
router.route('/inventory/:id').patch(inventory_controllers_1.updateInventoryController);
router.route('/inventory/:id').delete(inventory_controllers_1.deleteInventoryController);
exports.default = router;
//# sourceMappingURL=inventory.routes.js.map