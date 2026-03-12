import { Router } from "express";
import { createInventory, getInventories, getInventoryById, updateInventory, deleteInventory } from "../controllers/inventory.controllers";

const router = Router();

router.post("/inventory", createInventory);
router.get("/inventories", getInventories);
router.get('/inventory/:id', getInventoryById);
router.patch('/inventory/:id', updateInventory);
router.delete('/inventory:id', deleteInventory)
export default router;