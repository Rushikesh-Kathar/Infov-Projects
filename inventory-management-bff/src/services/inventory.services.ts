import axios from "axios";
import { config } from "../config/config";


const INVENTORY_SERVICE_URL = config.inventoryServiceUrl;
console.log("Inventory Service URL:", INVENTORY_SERVICE_URL);
if (!process.env.INVENTORY_SERVICE_URL) {
    throw new Error("INVENTORY_SERVICE_URL is not defined");
}
export const createInventoryService = async (data: any) => {
    const response = await axios.post(`${process.env.INVENTORY_SERVICE_URL}/inventory`, data);
    return response.data;
}

export const getInventoriesService = async (data: any) => {
    const response = await axios.get(`${process.env.INVENTORY_SERVICE_URL}/inventories`, data);
    return response.data;
}

export const getInventoryByIdService = async (id: string) => {
    const response = await axios.get(`${process.env.INVENTORY_SERVICE_URL}/inventory/${id}`);
    return response.data;
}
export const updateInventoryByIdService = async (id: string, data: any) => {
    const response = await axios.patch(`${process.env.INVENTORY_SERVICE_URL}/inventory/${id}`, data);
    return response.data;
}

export const deleteInventoryByIdService = async (id: string) => {
    const response = await axios.delete(`${process.env.INVENTORY_SERVICE_URL}/inventory/${id}`);
    return response.data;
}
