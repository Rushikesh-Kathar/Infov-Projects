import axios from "axios";
import { config } from "../config/config";


const OFFER_SERVICE_URL = config.offerServiceUrl;
if (!process.env.OFFER_SERVICE_URL) {
    throw new Error("OFFER_SERVICE_URL is not defined");
}
export const createOfferService = async (data: any) => {
    const response = await axios.post(`${OFFER_SERVICE_URL}/offer`, data);
    return response.data;
}

export const getAllOffersService = async () => {
    const response = await axios.get(`${OFFER_SERVICE_URL}/offer`);
    return response.data
}

export const getOfferBySearchService = async (data: any) => {
    const response = await axios.get(`${OFFER_SERVICE_URL}/offer/search`, data);
    return response.data
}

export const getOfferByIdService = async (offerId: string) => {
    const response = await axios.get(`${OFFER_SERVICE_URL}/offer/${offerId}`);
    return response.data
}

export const updateOfferByIdService = async (offerId: string, data: any) => {
    const response = await axios.patch(`${OFFER_SERVICE_URL}/offer/${offerId}`, data);
    return response.data
}

export const deleteOfferByIdService = async (offerId: string) => {
    const response = await axios.delete(`${OFFER_SERVICE_URL}/offer/${offerId}`);
    return response.data
}

export const activateOfferByIdService = async (offerId: string) => {
    const response = await axios.patch(`${OFFER_SERVICE_URL}/offers/${offerId}/activate`);
    return response.data
}

export const deactivateOfferByIdService = async (offerId: string) => {
    const response = await axios.patch(`${OFFER_SERVICE_URL}/offers/${offerId}/deactivate`);
    return response.data
}

export const expiryOfferByIdService = async (offerId: string) => {
    const response = await axios.patch(`${OFFER_SERVICE_URL}/offers/${offerId}/expire`);
    return response.data
}