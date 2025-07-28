import React, { useEffect, useState } from "react";
import LendingForm from "../components/forms/LendingForm";
import toast from "react-hot-toast";
import type { Lending } from "../types/Lending";
import LendingTable from "../components/tables/lendingtable";
import { addLending, getAllLendings } from "../service/LendingService";

const LendingPage: React.FC = () => {
  const [lendings, setLendings] = useState<Lending[]>([]);

  const fetchLendings = async () => {
    try {
      const data = await getAllLendings();
      setLendings(data);
    } catch {
      toast.error("Failed to load lendings");
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
    fetchLendings();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Lending Management</h1>
      <LendingForm onSubmit={handleLendBook} />
      <LendingTable records={lendings} />
    </div>
  );
};

export default LendingPage;
