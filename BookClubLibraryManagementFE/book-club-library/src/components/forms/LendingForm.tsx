import { useState, type FormEvent } from "react";
import type { Lending } from "../../types/Lending";
import type { Reader } from "../../types/Reader";
import type { Book } from "../../types/Book";

type Props = {
  onSubmit: (data: Lending) => void;
  books: Book[];
  readers: Reader[];
};

const LendingForm: React.FC<Props> = ({ onSubmit, books, readers }) => {
  const [formData, setFormData] = useState<Lending>({
    bookId: "",
    readerId: "",
    lendDate: "",
    dueDate: "",
    returnDate: "",
    status: "borrowed",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      bookId: "",
      readerId: "",
      lendDate: "",
      dueDate: "",
      returnDate: "",
      status: "borrowed",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
      <div>
        <label className="block">Select Book</label>
        <select
          name="bookId"
          value={formData.bookId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Select Book --</option>
          {books.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">Select Reader</label>
        <select
          name="readerId"
          value={formData.readerId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Select Reader --</option>
          {readers.map((reader) => (
            <option key={reader._id} value={reader._id}>
                {reader.first_name} {reader.last_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block">Lend Date</label>
        <input
          name="lendDate"
          type="date"
          value={formData.lendDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block">Due Date</label>
        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block">Return Date</label>
        <input
          name="returnDate"
          type="date"
          value={formData.returnDate || ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="borrowed">Borrowed</option>
          <option value="returned">Returned</option>
          <option value="late">Late</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Lend Book
      </button>
    </form>
  );
};

export default LendingForm;
