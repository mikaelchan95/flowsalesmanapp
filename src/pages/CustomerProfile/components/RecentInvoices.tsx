import React from 'react';
import { FileText, Download } from 'lucide-react';
import { RecentInvoicesProps } from '../types';
import { formatCurrency, formatDate } from '../../../utils/helpers';

const RecentInvoices: React.FC<RecentInvoicesProps> = ({ invoices }) => {
  const handleDownloadPDF = (invoiceId: string) => {
    console.log(`Downloading PDF for invoice ${invoiceId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Invoices</h2>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
            <div>
              <p className="font-semibold">{invoice.id}</p>
              <p className="text-sm text-gray-600">{formatDate(invoice.date)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="font-bold">{formatCurrency(invoice.amount)}</p>
              <button
                onClick={() => handleDownloadPDF(invoice.id)}
                className="text-gray-600 hover:text-gray-800"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentInvoices;