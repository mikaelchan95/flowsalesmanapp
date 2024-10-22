import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Customer } from '../../../data/types';

interface CustomerSearchProps {
  customerSearch: string;
  setCustomerSearch: (search: string) => void;
  showCustomerDropdown: boolean;
  filteredCustomers: Customer[];
  setSelectedCustomer: (customer: Customer | null) => void;
  setShowCustomerDropdown: (show: boolean) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({
  customerSearch,
  setCustomerSearch,
  showCustomerDropdown,
  filteredCustomers,
  setSelectedCustomer,
  setShowCustomerDropdown
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder={t('newOrder.searchCustomers')}
          value={customerSearch}
          onChange={(e) => setCustomerSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      {showCustomerDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedCustomer(customer);
                setCustomerSearch('');
                setShowCustomerDropdown(false);
              }}
            >
              <div className="font-semibold">{customer.name}</div>
              <div className="text-sm text-gray-600">{customer.uenNo}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;