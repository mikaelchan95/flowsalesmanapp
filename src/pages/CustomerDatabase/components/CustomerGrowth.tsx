import React from 'react';
import { Customer } from '../../../data/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CustomerGrowthProps {
  customers: Customer[];
}

const CustomerGrowth: React.FC<CustomerGrowthProps> = ({ customers }) => {
  // This is a mock data generator. In a real application, you would calculate this based on actual customer data.
  const generateMockGrowthData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      name: month,
      customers: Math.floor(customers.length * (1 + index * 0.1)),
    }));
  };

  const data = generateMockGrowthData();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Customer Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="customers" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerGrowth;