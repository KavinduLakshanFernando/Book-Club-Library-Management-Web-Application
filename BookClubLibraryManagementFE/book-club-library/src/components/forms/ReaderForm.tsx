import { Save, UserPlus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Reader } from "../../types/Reader";

interface ReaderFormProps {
  reader: Reader | null;
  onSubmit: (readerData: Omit<Reader, "_id">) => void;
  onClose: () => void;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  age?: string;
  address?: string;
  phone?: string;
  join_date?: string;
}

const ReaderForm: React.FC<ReaderFormProps> = ({ reader, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<Omit<Reader, "_id">>({
    first_name: "",
    last_name: "",
    email: "",
    age: 0,
    address: "",
    phone: "",
    join_date: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (reader) {
      setFormData({
        first_name: reader.first_name,
        last_name: reader.last_name,
        email: reader.email,
        age: reader.age,
        address: reader.address,
        phone: reader.phone,
        join_date: reader.join_date,
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        age: 0,
        address: "",
        phone: "",
        join_date: "",
      });
    }
  }, [reader]);

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.first_name.trim()) errors.first_name = "Required";
    if (!formData.last_name.trim()) errors.last_name = "Required";
    if (!formData.email.trim()) errors.email = "Required";
    if (formData.age <= 0) errors.age = "Must be a valid age";
    if (!formData.phone.trim()) errors.phone = "Required";
    if (!formData.address.trim()) errors.address = "Required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              {reader ? "Edit Reader" : "Add Reader"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {formErrors.first_name && (
                  <p className="text-red-500 text-sm">{formErrors.first_name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {formErrors.last_name && (
                  <p className="text-red-500 text-sm">{formErrors.last_name}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {formErrors.age && (
                  <p className="text-red-500 text-sm">{formErrors.age}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-sm">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm">{formErrors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Join Date</label>
              <input
                type="date"
                name="join_date"
                value={formData.join_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 px-6 py-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              <span>Save Reader</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReaderForm;
