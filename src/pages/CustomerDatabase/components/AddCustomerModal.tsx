import React, { useState } from 'react';
import { Customer, CustomerType } from '../../../data/types';
import { X } from 'lucide-react';

interface AddCustomerModalProps {
  onSubmit: (customer: Customer) => void;
  onCancel: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    type: CustomerType.Restaurant,
    address: '',
    billingEntity: '',
    payer: '',
    creditLimit: 0,
    outstandingBalance: 0,
    uenNo: '',
    phoneNumber: '',
    email: '',
    salesman: localStorage.getItem('currentUser') || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'creditLimit' || name === 'outstandingBalance' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Customer);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Customer</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              {Object.values(CustomerType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">UEN No.</label>
            <input type="text" name="uenNo" value={formData.uenNo} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Credit Limit</label>
            <input type="number" name="creditLimit" value={formData.creditLimit} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Outstanding Balance</label>
            <input type="number" name="outstandingBalance" value={formData.outstandingBalance} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">Add Customer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;