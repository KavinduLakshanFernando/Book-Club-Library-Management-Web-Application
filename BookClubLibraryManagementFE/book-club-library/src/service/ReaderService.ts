import type { Reader } from "../types/Reader";
import { apiClient, BASE_URL } from "./ApiClient";

const Reader_URL = `${BASE_URL}/reader`;

export const getAllReaders = async (): Promise<Reader[]> => {
  const response = await apiClient.get(`${Reader_URL}/getReaders`);
  return response.data;
};

export const addReader = async (reader: Omit<Reader, "_id">): Promise<Reader> => {
  const response = await apiClient.post(Reader_URL, reader);
  return response.data;
};

export const updateReader = async (reader: Reader): Promise<Reader> => {
  const response = await apiClient.put(`${Reader_URL}/${reader._id}`, reader);
  return response.data;
};

export const deleteReader = async (id: string): Promise<void> => {
  await apiClient.delete(`${Reader_URL}/${id}`);
};
