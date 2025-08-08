import { useState, useEffect } from 'react';
import { Calendar, Mail, AlertTriangle, Clock, CheckCircle, Check } from 'lucide-react';
import { getAllLendings, markAsReturned } from '../service/LendingService';
import { LendingData } from '../data/Data';
import type { Lending } from '../types/Lending';
import { sendEmail } from '../service/EmailSender';
import type { Email } from '../types/Email';

const OverDueBooksPage = () => {
  const [lendings, setLendings] = useState<Lending[]>(LendingData || []);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('overdue'); // Default to 'overdue'

  useEffect(() => {
    fetchLendings();
  }, []);

  const fetchLendings = async () => {
    try {
      setLoading(true);
      const response = await getAllLendings();
      console.log('Fetched lendings:', response);
      const data = Array.isArray(response) ? response : [];
      setLendings(data);
      console.log('Set lendings:', data);
    } catch (error) {
      console.error('Error fetching lendings:', error);
      setLendings([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysOverdue = (dueDate: string) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of day
      const due = new Date(dueDate);
      if (isNaN(due.getTime())) {
        console.warn(`Invalid dueDate: ${dueDate}`);
        return 0;
      }
      const diffTime = today.getTime() - due.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch (error) {
      console.error('Error calculating days overdue:', error);
      return 0;
    }
  };

  const calculateDaysUntilDue = (dueDate: string) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(dueDate);
      if (isNaN(due.getTime())) {
        console.warn(`Invalid dueDate: ${dueDate}`);
        return 0;
      }
      const diffTime = due.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch (error) {
      console.error('Error calculating days until due:', error);
      return 0;
    }
  };

  const getStatusBadge = (lending: Lending) => {
    const { status, dueDate } = lending;
    const daysOverdue = calculateDaysOverdue(dueDate);
    const daysUntilDue = calculateDaysUntilDue(dueDate);

    if (status === 'returned') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Returned
        </span>
      );
    }

    if (daysOverdue > 0) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {daysOverdue} days overdue
        </span>
      );
    }

    if (daysUntilDue <= 3 && daysUntilDue >= 0) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          Due in {daysUntilDue} days
        </span>
      );
    }

    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Borrowed
      </span>
    );
  };

  const handleSendEmail = async (lending: Lending) => {
    try {
      const emailData: Email = {
        to: lending.email || '',
        subject: 'Book Return Reminder',
        body: 'Dear Reader,\\n\\nThis is a reminder that the book you borrowed is due on ' + new Date(lending.dueDate).toLocaleDateString() + '. Please return it by the due date to avoid any late fees.\\n\\nThank you!\\nBook Club Library',
      };
      console.log('Sending email:', emailData);
      
      
      const response = await sendEmail(emailData);
      console.log('Email sent response:', response);
      alert(`Reminder email sent to ${lending.email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending reminder email');
    }
  };

  const filteredLendings = (lendings || []).filter((lending) => {
    const daysOverdue = calculateDaysOverdue(lending.dueDate);
    const daysUntilDue = calculateDaysUntilDue(lending.dueDate);
    const status = lending.status || 'borrowed'; // Default to 'borrowed'

    //console.log(`Filtering lending ${_id}:`, { daysOverdue, daysUntilDue, status });

    if (filter === 'all') return true;
    if (filter === 'overdue') return daysOverdue > 0; // Ignore status for overdue
    if (filter === 'dueSoon') return status !== 'returned' && daysUntilDue <= 3 && daysUntilDue >= 0;
    return status === filter;
  });

  const stats = {
    total: lendings.length,
    overdue: lendings.filter((l) => calculateDaysOverdue(l.dueDate) > 0).length, // Ignore status for overdue
    dueSoon: lendings.filter((l) => {
      const days = calculateDaysUntilDue(l.dueDate);
      return (l.status || 'borrowed') !== 'returned' && days <= 3 && days >= 0;
    }).length,
    returned: lendings.filter((l) => (l.status || 'borrowed') === 'returned').length,
    borrowed: lendings.filter((l) => (l.status || 'borrowed') === 'borrowed').length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleReturnBook = async (lending: Lending) => {
    if (window.confirm(`Are you sure you want to mark the book as returned?`)) {
      const response = await markAsReturned(lending._id || '');
      console.log('Return book response:', response);
      alert('Book marked as returned successfully');
      fetchLendings(); // Refresh the list after returning
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Due Orders Management</h1>
        <p className="text-gray-600">Manage lending records, send reminders, and track returns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <Calendar className="ml-auto h-8 w-8 text-blue-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">Total Lendings</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">{stats.overdue}</div>
            <AlertTriangle className="ml-auto h-8 w-8 text-red-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">Overdue Books</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">{stats.dueSoon}</div>
            <Clock className="ml-auto h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">Due Soon</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">{stats.returned}</div>
            <CheckCircle className="ml-auto h-8 w-8 text-green-500" />
          </div>
          <p className="text-sm text-gray-500 mt-1">Returned Books</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { key: 'all', label: 'All', count: stats.total },
              { key: 'overdue', label: 'Overdue', count: stats.overdue },
              { key: 'dueSoon', label: 'Due Soon', count: stats.dueSoon },
              { key: 'borrowed', label: 'Borrowed', count: stats.borrowed },
              { key: 'returned', label: 'Returned', count: stats.returned },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book & Reader
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLendings.map((lending) => (
                <tr key={lending._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lending.bookId}</div>
                      <div className="text-sm text-gray-500">Reader: {lending.readerId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Lent: {new Date(lending.lendDate).toLocaleDateString()}</div>
                      <div>Due: {new Date(lending.dueDate).toLocaleDateString()}</div>
                      {lending.returnDate && (
                        <div className="text-green-600">
                          Returned: {new Date(lending.returnDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(lending)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lending.email || 'No email'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {(lending.status || 'borrowed') !== 'returned' && (
                        <button
                          onClick={() => handleSendEmail(lending)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Send reminder email"
                        >
                          <Mail className="h-4 w-4" />
                        </button>

                        
                        
                      )}
                      {(lending.status || 'borrowed') === 'borrowed' && (
                        <button
                          onClick={() => handleReturnBook(lending)}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                          title="Return book"
                        >
                          <Check className="h-4 w-4" />
                        </button>

                        
                        
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLendings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No lending records</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' ? 'No lending records found.' : `No ${filter} records found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverDueBooksPage;