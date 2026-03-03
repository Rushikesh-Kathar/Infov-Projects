"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryController = exports.updateInventoryController = exports.getInventoryByIdController = exports.getInventoriesController = exports.inventoryController = void 0;
const inventory_services_1 = require("../services/inventory.services");
const inventoryController = async (req, res) => {
    try {
        const { car_model_id, vin_number, color, manufacture_year, variant, status } = req.body;
        if (!car_model_id || !vin_number || !color || !manufacture_year || !variant || !status) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
        const result = await (0, inventory_services_1.createInventoriesService)({
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.inventoryController = inventoryController;
const getInventoriesController = async (req, res) => {
    try {
        const result = await (0, inventory_services_1.getInventoriesService)();
        res.status(200).json({
            message: 'Inventories retrieved successfully',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getInventoriesController = getInventoriesController;
const getInventoryByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || Array.isArray(id)) {
            res.status(400).json({ message: "Invalid id parameter" });
            return;
        }
        const result = await (0, inventory_services_1.getInventoryByIdService)(id);
        res.status(200).json({
            message: 'Inventory retrived Successfully',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getInventoryByIdController = getInventoryByIdController;
const updateInventoryController = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await (0, inventory_services_1.updateInventoryService)(userId, req.body);
        res.status(200).json({
            message: 'Inventory updated successfully',
            data: result
        });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};
exports.updateInventoryController = updateInventoryController;
const deleteInventoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await (0, inventory_services_1.deleteInventoryService)(id);
        res.status(200).json({
            message: 'Inventory deleted successfully',
            data: result
        });
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
};
exports.deleteInventoryController = deleteInventoryController;
//# sourceMappingURL=inventory.controllers.js.map