import axios from "axios";
import { config } from "../config/config";


const ENQUIRY_SERVICE_URL = config.enquiryServiceUrl;
if (!process.env.ENQUIRY_SERVICE_URL) {
    throw new Error("ENQIRY_SERVICE_URL is not defined");
}

export const createEnquiryService = async (data: any) => {
    const response = await axios.post(`${ENQUIRY_SERVICE_URL}/enquiry`, data);
    return response.data;
};

export const getEnquiriesService = async (data: any) => {
    const response = await axios.get(`${ENQUIRY_SERVICE_URL}/enquiries`, data);
    return response.data;
}

export const getCarModelsService = async (data: any) => {
    const response = await axios.get(`${ENQUIRY_SERVICE_URL}/car-models`, data);
    return response.data;
}

export const getEnquiriesBySearchService = async (data: any) => {
    const response = await axios.get(`${ENQUIRY_SERVICE_URL}/enquiries/search`, data);
    return response.data;
}

export const getEnquiriesByIdService = async (id: string) => {
    console.log(id);
    const response = await axios.get(`${ENQUIRY_SERVICE_URL}/enquiries/${id}`);
    return response.data;
}

export const updateEnquiriyByIdService = async (id: string) => {
    const response = await axios.patch(`${ENQUIRY_SERVICE_URL}/enquiry/${id}`);
    return response.data;
}

export const deleteEnquiriyByIdService = async (id: string) => {
    const response = await axios.delete(`${ENQUIRY_SERVICE_URL}/enquiry/${id}`);
    return response.data;
}