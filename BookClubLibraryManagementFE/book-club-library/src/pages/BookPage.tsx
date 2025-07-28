import React, { useEffect, useState } from "react";
import BookTable from "../components/tables/BookTable";
import { addBook, deleteBook, getAllBooks, updateBook } from "../service/Bookservice";
import type { Book } from "../types/Book";
import toast from "react-hot-toast";
import BookForm from "../components/forms/BookForm";
import Dialog from "../components/Dialog";

const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const data = await getAllBooks();
      setBooks(data);
    } catch {
      toast.error("Failed to fetch books");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = () => {
    setSelectedBook(null);
    setIsAddDialogOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };

  const handleDeleteBook = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (bookData: Omit<Book, "_id" | "timeStamp"> & { publishedDate?: Date }) => {
  try {
    if (selectedBook && selectedBook._id) {  // extra null check
      const updated = await updateBook({ ...selectedBook, ...bookData });
      toast.success("Book updated successfully");
      setBooks((prev) =>
        prev.map((book) => (book._id === updated._id ? updated : book))
      );
      setIsEditDialogOpen(false);
    } else {
      const newBook = await addBook({ ...bookData, timeStamp: new Date() });
      setBooks((prev) => [...prev, newBook]);
      toast.success("Book added successfully!");
      setIsAddDialogOpen(false);
    }
  } catch (error) {
    toast.error("Failed to save book");
    console.error(error);
  } finally {
    setSelectedBook(null);
  }
};


  const handleDeleteConfirm = async () => {
    if (!selectedBook) return;
    try {
      await deleteBook(selectedBook._id);
      setBooks((prev) => prev.filter((book) => book._id !== selectedBook._id));
      toast.success("Book deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedBook(null);
    } catch {
      toast.error("Failed to delete book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Book Management</h1>
          <p className="text-gray-600">Manage books in your library catalog</p>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleAddBook}
        >
          Add New Book
        </button>
      </div>

      <BookTable
        books={books}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
        isLoading={isLoading}
      />

      {(isAddDialogOpen || isEditDialogOpen) && (
        <BookForm
          book={selectedBook}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setSelectedBook(null);
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
          }}
        />
      )}

      <Dialog
        isOpen={isDeleteDialogOpen}
        title="Confirm Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
      >
        Are you sure you want to delete this book?
      </Dialog>
    </div>
  );
};

export default BookPage;
