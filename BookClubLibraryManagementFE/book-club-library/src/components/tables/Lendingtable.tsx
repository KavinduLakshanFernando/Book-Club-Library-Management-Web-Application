import React from "react";
import type { Lending } from "../../types/Lending";


type Props = {
  records: Lending[];
};

const LendingTable: React.FC<Props> = ({ records }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Book ID</th>
            <th className="p-2">Reader ID</th>
            <th className="p-2">Lend Date</th>
            <th className="p-2">Due Date</th>
            <th className="p-2">Return Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id} className="border-t">
              <td className="p-2">{record.bookId}</td>
              <td className="p-2">{record.readerId}</td>
              <td className="p-2">{record.lendDate?.slice(0, 10)}</td>
              <td className="p-2">{record.dueDate?.slice(0, 10)}</td>
              <td className="p-2">{record.returnDate ? record.returnDate.slice(0, 10) : "-"}</td>
              <td className="p-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LendingTable;
