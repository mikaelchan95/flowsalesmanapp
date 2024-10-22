import React from 'react';
import { Customer } from '../../../data/types';
import { formatDate } from '../../../utils/helpers';

interface RecentCustomersProps {
  customers: Customer[];
}

const RecentCustomers: React.FC<RecentCustomersProps> = ({ customers }) => {
  const sortedCustomers = [...customers].sort((a, b) => {
    const dateA = new Date(a.recentInvoices[0]?.date || 0);
    const dateB = new Date(b.recentInvoices[0]?.date || 0);
    return dateB.getTime() - dateA.getTime();
  });

  const recentCustomers = sortedCustomers.slice(0, 5);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Customers</h2>
      <ul className="space-y-2">
        {recentCustomers.map(customer => (
          <li key={customer.id} className="flex justify-between items-center">
            <span className="font-medium">{customer.name}</span>
            <span className="text-sm text-gray-500">
              {formatDate(customer.recentInvoices[0]?.date || '')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentCustomers;