import type { Book } from "../types/Book";
import { apiClient, BASE_URL } from "./ApiClient";

const Book_URL = `${BASE_URL}/book`;

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await apiClient.get(`${Book_URL}/getBooks`);
  return response.data;
};


export const addBook = async (book: Omit<Book, "_id">): Promise<Book> => {
  const response = await apiClient.post(`${Book_URL}/add`, book);
  return response.data;
};

export const updateBook = async (book: Book): Promise<Book> => {
  const response = await apiClient.put(`${Book_URL}/${book._id}`, book);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await apiClient.delete(`${Book_URL}/${id}`);
};