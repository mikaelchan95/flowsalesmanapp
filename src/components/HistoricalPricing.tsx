import React from 'react';
import { X } from 'lucide-react';
import { getHistoricalPricingForProduct } from '../data';

interface HistoricalPricingProps {
  productId: number;
  onClose: () => void;
}

const HistoricalPricing: React.FC<HistoricalPricingProps> = ({ productId, onClose }) => {
  const historicalData = getHistoricalPricingForProduct(productId);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Historical Pricing for Product ID: {productId}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.customerName}</td>
                  <td>${record.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoricalPricing;