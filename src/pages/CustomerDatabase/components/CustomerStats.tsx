import React from 'react';
import { Users, DollarSign, CreditCard } from 'lucide-react';
import { Customer } from '../../../data/types';

interface CustomerStatsProps {
  customers: Customer[];
}

const CustomerStats: React.FC<CustomerStatsProps> = ({ customers }) => {
  const totalCustomers = customers.length;
  const totalCreditLimit = customers.reduce((sum, customer) => sum + customer.creditLimit, 0);
  const totalOutstandingBalance = customers.reduce((sum, customer) => sum + customer.outstandingBalance, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Customer Statistics</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Users className="text-blue-500 mr-2" size={24} />
          <div>
            <p className="text-sm text-gray-600">Total Customers</p>
            <p className="text-lg font-semibold">{totalCustomers}</p>
          </div>
        </div>
        <div className="flex items-center">
          <CreditCard className="text-green-500 mr-2" size={24} />
          <div>
            <p className="text-sm text-gray-600">Total Credit Limit</p>
            <p className="text-lg font-semibold">${totalCreditLimit.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center">
          <DollarSign className="text-red-500 mr-2" size={24} />
          <div>
            <p className="text-sm text-gray-600">Total Outstanding Balance</p>
            <p className="text-lg font-semibold">${totalOutstandingBalance.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerStats;