import React from 'react';
import { Link } from 'react-router-dom';
import { Customer } from '../../../data/types';
import { formatCurrency } from '../../../utils/helpers';
import { Eye, CreditCard, DollarSign } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  if (customers.length === 0) {
    return <div className="text-center py-4">No customers found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UEN No.</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Limit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Balance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.uenNo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{customer.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <CreditCard size={16} className="text-green-500 mr-2" />
                  {formatCurrency(customer.creditLimit)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <DollarSign size={16} className="text-red-500 mr-2" />
                  {formatCurrency(customer.outstandingBalance)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  to={`/customers/${customer.id}`}
                  className="text-blue-600 hover:text-blue-900 flex items-center"
                >
                  <Eye size={16} className="mr-1" />
                  View Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;