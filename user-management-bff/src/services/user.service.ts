import axios from "axios";
import { config } from "../config/config";

const USER_SERVICE_URL = config.userServiceUrl;
console.log("USER_SERVICE_URL =", process.env.USER_SERVICE_URL);
if (!process.env.USER_SERVICE_URL) {
    throw new Error("USER_SERVICE_URL is not defined");
}
export const createUser = async (data: any) => {
    console.log("Creating user with data:", data);
    const response = await axios.post(`${USER_SERVICE_URL}/register`, data);
    console.log("User created successfully:", response.data);
    return response.data;
};

export const login = async (data: any) => {
    const response = await axios.post(`${USER_SERVICE_URL}/login`, data);
    return response.data;
};

export const getUser = async (data: any) => {
    const response = await axios.get(`${USER_SERVICE_URL}/users`, { data });
    return response.data;
}

export const updateUser = async (id: string, data: any) => {
    const response = await axios.patch(`${USER_SERVICE_URL}/users/${id}`, data);
    return response.data;
}

export const deleteUser = async (id: string) => {
    console.log("Deleting user with ID:", id, `${USER_SERVICE_URL}/users/${id}`);
    try {

        const response = await axios.delete(`${USER_SERVICE_URL}/users/${id}`);

        console.log("User deleted successfully:", response);
        return response.data;
    }
    catch (error: any) {
        console.error("error", error);
    }

}