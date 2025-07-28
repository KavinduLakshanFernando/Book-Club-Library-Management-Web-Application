import React from "react";
import type { Book } from "../../types/Book";

type BookTableProps = {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  isLoading?: boolean;
};

const BookTable: React.FC<BookTableProps> = ({
  books,
  onEdit,
  onDelete,
  isLoading,
}) => {
  if (isLoading) return <p>Loading books...</p>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Author</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Publisher</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Published Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900">{book.title}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{book.author}</td>
                <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs">{book.description}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{book.category}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{book.publisher}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{book.quantity}</td>
                <td className="px-6 py-4 text-sm text-gray-700 space-x-2">
                  <button
                    onClick={() => onEdit(book)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(book)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
