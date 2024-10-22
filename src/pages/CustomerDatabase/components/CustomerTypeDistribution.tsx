import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Customer, CustomerType } from '../../../data/types';

interface CustomerTypeDistributionProps {
  customers: Customer[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CustomerTypeDistribution: React.FC<CustomerTypeDistributionProps> = ({ customers }) => {
  const typeDistribution = Object.values(CustomerType).map(type => ({
    name: type,
    value: customers.filter(customer => customer.type === type).length
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Customer Type Distribution</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={typeDistribution}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {typeDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerTypeDistribution;