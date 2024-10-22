import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, MapPin, CreditCard, DollarSign, FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { getCustomerProfileForSalesman } from '../data/mockData';

const CustomerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showFullStatement, setShowFullStatement] = useState(false);

  const currentUser = localStorage.getItem('currentUser') || '';
  const customer = getCustomerProfileForSalesman(parseInt(id || '0'), currentUser);

  const handleDownloadPDF = (invoiceId: string) => {
    // Implement PDF download logic here
    console.log(`Downloading PDF for invoice ${invoiceId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600';
      case 'outstanding':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Customer Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CustomerInfo customer={customer} className="md:col-span-2 lg:col-span-3" />
        <CreditInfo customer={customer} className="md:col-span-2 lg:col-span-2" />
        <RecentInvoices invoices={customer.recentInvoices} onDownload={handleDownloadPDF} />
        <StatementOfAccount
          transactions={customer.statementOfAccount}
          showFullStatement={showFullStatement}
          setShowFullStatement={setShowFullStatement}
          getStatusColor={getStatusColor}
          className="md:col-span-2 lg:col-span-3"
        />
      </div>
    </div>
  );
};

// ... (rest of the component remains the same)

export default CustomerProfile;