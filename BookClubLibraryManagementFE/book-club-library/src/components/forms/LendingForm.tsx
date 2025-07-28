import { useState, type FormEvent } from "react";
import type { Lending } from "../../types/Lending";


type Props = {
  onSubmit: (data: Lending) => void;
};

const LendingForm: React.FC<Props> = ({ onSubmit }) => {
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
        <label className="block">Book ID</label>
        <input
          name="bookId"
          value={formData.bookId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block">Reader ID</label>
        <input
          name="readerId"
          value={formData.readerId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
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
        <label className="block">Return Date (optional)</label>
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
