import type { Lending } from "../types/Lending";
import { apiClient, BASE_URL } from "./ApiClient";

const Lending_URL = `${BASE_URL}/landing`;

export const addLending = async (data: Lending) => {
  const res = await apiClient.post(`${Lending_URL}/landbook`, data);
  return res.data;
};

export const getAllLendings = async () => {
  const res = await apiClient.get(`${Lending_URL}/getAllRecords`);
  return res.data;
};
