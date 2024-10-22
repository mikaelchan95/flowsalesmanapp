import React from 'react';
import { CreditCard, DollarSign, Calendar, FileText, AlertTriangle } from 'lucide-react';
import { CreditInfoProps } from '../types';
import { formatCurrency, formatDate } from '../../../utils/helpers';

const CreditInfo: React.FC<CreditInfoProps> = ({ customer, className }) => {
  const getCreditStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'text-green-600';
      case 'Warning':
        return 'text-yellow-600';
      case 'Suspended':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Credit Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center bg-gray-100 p-4 rounded-lg">
            <CreditCard className="mr-2 text-black" size={24} />
            <div>
              <p className="text-sm text-gray-600">Credit Limit</p>
              <p className="text-lg font-semibold">{formatCurrency(customer.creditLimit)}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg">
            <DollarSign className="mr-2 text-black" size={24} />
            <div>
              <p className="text-sm text-gray-600">Outstanding Balance</p>
              <p className="text-lg font-semibold">{formatCurrency(customer.outstandingBalance)}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg">
            <FileText className="mr-2 text-black" size={24} />
            <div>
              <p className="text-sm text-gray-600">Credit Terms</p>
              <p className="text-lg font-semibold">{customer.creditTerms}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg">
            <Calendar className="mr-2 text-black" size={24} />
            <div>
              <p className="text-sm text-gray-600">Next Due Date</p>
              <p className="text-lg font-semibold">{formatDate(customer.nextDueDate)}</p>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 p-4 rounded-lg">
            <AlertTriangle className={`mr-2 ${getCreditStatusColor(customer.creditStatus)}`} size={24} />
            <div>
              <p className="text-sm text-gray-600">Credit Status</p>
              <p className={`text-lg font-semibold ${getCreditStatusColor(customer.creditStatus)}`}>
                {customer.creditStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditInfo;