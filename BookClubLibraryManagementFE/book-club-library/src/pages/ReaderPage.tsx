import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAllReaders,
  addReader,
  updateReader,
  deleteReader,
} from "../service/ReaderService";
import type { Reader } from "../types/Reader";
import ReaderTable from "../components/tables/ReaderTable";
import ReaderForm from "../components/forms/ReaderForm";
import Dialog from "../components/Dialog";

const ReaderPage: React.FC = () => {
  const [readers, setReaders] = useState<Reader[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReader, setSelectedReader] = useState<Reader | null>(null);

  const fetchReaders = async () => {
    try {
      setIsLoading(true);
      const data = await getAllReaders();
      setReaders(data);
    } catch {
      toast.error("Failed to fetch readers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  const handleAddReader = () => {
    setSelectedReader(null);
    setIsAddDialogOpen(true);
  };

  const handleEditReader = (reader: Reader) => {
    setSelectedReader(reader);
    setIsEditDialogOpen(true);
  };

  const handleDeleteReader = (reader: Reader) => {
    setSelectedReader(reader);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (readerData: Omit<Reader, "_id">) => {
    try {
      if (selectedReader) {
        // Update existing reader
        const updated = await updateReader({ ...selectedReader, ...readerData });
        setReaders((prev) =>
          prev.map((r) => (r._id === updated._id ? updated : r))
        );
        toast.success("Reader updated");
        setIsEditDialogOpen(false);
      } else {
        // Add new reader
        const newReader = await addReader(readerData);
        setReaders((prev) => [...prev, newReader]);
        toast.success("Reader added");
        setIsAddDialogOpen(false);
      }
    } catch {
      toast.error("Operation failed");
    } finally {
      setSelectedReader(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedReader) return;
    try {
      await deleteReader(selectedReader._id);
      setReaders((prev) => prev.filter((r) => r._id !== selectedReader._id));
      toast.success("Reader deleted");
      setIsDeleteDialogOpen(false);
      setSelectedReader(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reader Management</h1>
          <p className="text-gray-600">Manage library members and their information</p>
        </div>
        <button
          onClick={handleAddReader}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Reader
        </button>
      </div>

      <ReaderTable
        readers={readers}
        onEdit={handleEditReader}
        onDelete={handleDeleteReader}
        isLoading={isLoading}
      />

      {(isAddDialogOpen || isEditDialogOpen) && (
        <ReaderForm
          reader={selectedReader}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setSelectedReader(null);
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
          }}
        />
      )}

      <Dialog
        isOpen={isDeleteDialogOpen}
        title="Confirm Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      >
        Are you sure you want to delete this reader?
      </Dialog>
    </div>
  );
};

export default ReaderPage;
