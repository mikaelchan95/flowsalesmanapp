import React from 'react';
import { Customer } from '../../../data/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../utils/helpers';

interface TopCustomersProps {
  customers: Customer[];
}

const TopCustomers: React.FC<TopCustomersProps> = ({ customers }) => {
  const sortedCustomers = [...customers].sort((a, b) => b.outstandingBalance - a.outstandingBalance);
  const topCustomers = sortedCustomers.slice(0, 5);

  const data = topCustomers.map(customer => ({
    name: customer.name,
    outstandingBalance: customer.outstandingBalance,
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Top Customers by Outstanding Balance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Bar dataKey="outstandingBalance" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCustomers;