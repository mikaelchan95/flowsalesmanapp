import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerProfileForSalesman } from '../../data/customers';
import CustomerInfo from './components/CustomerInfo';
import CreditInfo from './components/CreditInfo';
import RecentInvoices from './components/RecentInvoices';
import StatementOfAccount from './components/StatementOfAccount';
import OrderHistory from './components/OrderHistory';
import CustomerPreferences from './components/CustomerPreferences';
import CustomerNotes from './components/CustomerNotes';
import LeadManagement from './components/LeadManagement';
import FastReorder from './components/FastReorder';
import { getStatusColor } from './utils/helpers';

const CustomerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showFullStatement, setShowFullStatement] = useState(false);
  const [customer, setCustomer] = useState<any>(null);

  const currentUser = localStorage.getItem('currentUser') || '';

  useEffect(() => {
    const fetchCustomer = () => {
      const fetchedCustomer = getCustomerProfileForSalesman(parseInt(id || '0'), currentUser);
      setCustomer(fetchedCustomer);
    };

    fetchCustomer();
    const intervalId = setInterval(fetchCustomer, 5000);

    return () => clearInterval(intervalId);
  }, [id, currentUser]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{customer.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CustomerInfo customer={customer} className="md:col-span-2 lg:col-span-3" />
        <CreditInfo customer={customer} className="md:col-span-2 lg:col-span-2" />
        <RecentInvoices invoices={customer.recentInvoices} />
        <StatementOfAccount
          customer={customer}
          transactions={customer.statementOfAccount}
          showFullStatement={showFullStatement}
          setShowFullStatement={setShowFullStatement}
          getStatusColor={getStatusColor}
          className="md:col-span-2 lg:col-span-3"
        />
        <OrderHistory customerId={customer.id} className="md:col-span-2 lg:col-span-3" />
        <FastReorder customerId={customer.id} customerName={customer.name} className="md:col-span-2 lg:col-span-3" />
        <CustomerPreferences customer={customer} className="md:col-span-2 lg:col-span-2" />
        <CustomerNotes customerId={customer.id} className="md:col-span-2 lg:col-span-2" />
        <LeadManagement customer={customer} className="md:col-span-2 lg:col-span-3" />
      </div>
    </div>
  );
};

export default CustomerProfile;