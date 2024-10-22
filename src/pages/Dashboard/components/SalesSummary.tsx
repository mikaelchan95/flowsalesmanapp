import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlySales } from '../types';

interface SalesSummaryProps {
  monthlySales: MonthlySales[];
}

const SalesSummary: React.FC<SalesSummaryProps> = ({ monthlySales }) => {
  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold mb-4">Sales Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlySales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesSummary;