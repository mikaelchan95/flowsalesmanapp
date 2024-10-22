import React, { useState } from 'react';
import { Customer } from '../../../data/types';
import { updateCustomerProfile } from '../../../data/customers';

interface CustomerPreferencesProps {
  customer: Customer;
  className?: string;
}

const CustomerPreferences: React.FC<CustomerPreferencesProps> = ({ customer, className }) => {
  const [preferences, setPreferences] = useState(customer.preferences || {});
  const [isEditing, setIsEditing] = useState(false);

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const handleSave = () => {
    const updatedCustomer = { ...customer, preferences };
    updateCustomerProfile(updatedCustomer);
    setIsEditing(false);
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Customer Preferences</h2>
          {isEditing ? (
            <div>
              <button onClick={handleSave} className="btn btn-primary mr-2">Save</button>
              <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn btn-secondary">Edit</button>
          )}
        </div>
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
                <select
                  value={preferences.preferredContactMethod || ''}
                  onChange={(e) => handlePreferenceChange('preferredContactMethod', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select...</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Delivery Time</label>
                <input
                  type="text"
                  value={preferences.preferredDeliveryTime || ''}
                  onChange={(e) => handlePreferenceChange('preferredDeliveryTime', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="e.g., Afternoon, Evening"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
                <textarea
                  value={preferences.specialInstructions || ''}
                  onChange={(e) => handlePreferenceChange('specialInstructions', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  rows={3}
                  placeholder="Any special instructions for delivery or handling"
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Preferred Contact Method:</strong> {preferences.preferredContactMethod || 'Not specified'}</p>
              <p><strong>Preferred Delivery Time:</strong> {preferences.preferredDeliveryTime || 'Not specified'}</p>
              <p><strong>Special Instructions:</strong> {preferences.specialInstructions || 'None'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPreferences;