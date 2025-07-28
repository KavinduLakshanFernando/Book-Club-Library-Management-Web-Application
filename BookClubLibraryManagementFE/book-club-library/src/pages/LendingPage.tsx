import React, { useEffect, useState } from "react";
import LendingForm from "../components/forms/LendingForm";
import toast from "react-hot-toast";

import type { Lending } from "../types/Lending";
import { addLending, getAllLendings } from "../service/LendingService";
import { getAllReaders } from "../service/ReaderService";
import { getAllBooks } from "../service/Bookservice";
import type { Book } from "../types/Book";
import type { Reader } from "../types/Reader";
import LendingTable from "../components/tables/Lendingtable";

const LendingPage: React.FC = () => {
  const [lendings, setLendings] = useState<Lending[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [readers, setReaders] = useState<Reader[]>([]);

  const fetchAllData = async () => {
    try {
      const [lendingData, bookData, readerData] = await Promise.all([
        getAllLendings(),
        getAllBooks(),
        getAllReaders(),
      ]);
      setLendings(lendingData);
      setBooks(bookData);
      setReaders(readerData);
    } catch (error) {
      toast.error("Error loading lending data");
    }
  };

  const handleLendBook = async (lendingData: Lending) => {
    try {
      const newRecord = await addLending(lendingData);
      setLendings((prev) => [...prev, newRecord]);
      toast.success("Book lent successfully!");
    } catch {
      toast.error("Lending failed");
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Lending Management</h1>
      <LendingForm onSubmit={handleLendBook} books={books} readers={readers} />
      <h2 className="text-xl font-semibold">Lending Records</h2>

      <LendingTable records={lendings} />
    </div>
  );
};

export default LendingPage;
