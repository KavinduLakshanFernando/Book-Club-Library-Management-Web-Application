import type { Lending } from "../types/Lending";
import { apiClient, BASE_URL } from "./ApiClient";

const Lending_URL = `${BASE_URL}/landing`;

export const addLending = async (data: Lending) => {
  console.log(data);
  const res = await apiClient.post(`${Lending_URL}/landbook`, data);
  return res.data;
};

export const getAllLendings = async () => {
  const res = await apiClient.get(`${Lending_URL}/getAllRecords`);
  return res.data;
};

export const markAsReturned = async (id: string) => {
  const res = await apiClient.put(`${Lending_URL}/return/${id}`);
  return res.data;
}
