import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus } from 'lucide-react';
import AddCustomerForm from '../components/AddCustomerForm';
import { getCustomersForSalesman } from '../data/customers';

const CustomerDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const currentUser = localStorage.getItem('currentUser') || '';
  const customers = getCustomersForSalesman(currentUser);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.uenNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = (newCustomer: any) => {
    console.log('New customer added:', newCustomer);
    // In a real application, you would add the new customer to your database here
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Customer Database</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search customers by name or UEN"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
          <button className="btn btn-primary">
            <Search size={20} />
          </button>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-success flex items-center space-x-1"
        >
          <UserPlus size={20} />
          <span>Add Customer</span>
        </button>
      </div>
      {showAddForm && (
        <AddCustomerForm onSubmit={handleAddCustomer} onCancel={() => setShowAddForm(false)} />
      )}
      <div className="card">
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>UEN No.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.uenNo}</td>
                  <td>
                    <Link to={`/customers/${customer.id}`} className="text-blue-600 hover:text-blue-900">View Profile</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDatabase;