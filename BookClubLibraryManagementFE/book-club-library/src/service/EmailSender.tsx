import type { Email } from "../types/Email";
import { apiClient, BASE_URL } from "./ApiClient";

const Lending_URL = `${BASE_URL}/email`;

export const sendEmail = async (emailData: Email) => {
    try{
        const response = await apiClient.post(`${Lending_URL}/send`, emailData);
        return response.data;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}