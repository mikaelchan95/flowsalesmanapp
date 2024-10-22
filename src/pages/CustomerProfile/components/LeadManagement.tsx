import React, { useState } from 'react';
import { Customer } from '../../../data/types';
import { updateCustomerProfile } from '../../../data/customers';

interface LeadManagementProps {
  customer: Customer;
  className?: string;
}

const LeadManagement: React.FC<LeadManagementProps> = ({ customer, className }) => {
  const [leadStatus, setLeadStatus] = useState(customer.leadStatus || 'New');
  const [followUpDate, setFollowUpDate] = useState(customer.followUpDate || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const updatedCustomer = { ...customer, leadStatus, followUpDate };
    updateCustomerProfile(updatedCustomer);
    setIsEditing(false);
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lead Management</h2>
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
                <label className="block text-sm font-medium text-gray-700">Lead Status</label>
                <select
                  value={leadStatus}
                  onChange={(e) => setLeadStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed Won">Closed Won</option>
                  <option value="Closed Lost">Closed Lost</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Follow-up Date</label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Lead Status:</strong> {leadStatus}</p>
              <p><strong>Follow-up Date:</strong> {followUpDate || 'Not scheduled'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;