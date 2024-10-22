import React from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { StatementOfAccountProps } from '../types';
import { generatePDF } from '../utils/pdfGenerator';

const StatementOfAccount: React.FC<StatementOfAccountProps> = ({
  customer,
  transactions,
  showFullStatement,
  setShowFullStatement,
  getStatusColor,
  className,
}) => {
  const handleDownloadPDF = () => {
    generatePDF(customer, transactions);
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Statement of Account</h2>
          <button
            onClick={handleDownloadPDF}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Download size={20} />
            <span>Download PDF</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Reference</th>
                <th className="px-4 py-2 text-left">Invoice No</th>
                <th className="px-4 py-2 text-right">Debit</th>
                <th className="px-4 py-2 text-right">Credit</th>
                <th className="px-4 py-2 text-right">Balance</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {(showFullStatement ? transactions : transactions.slice(0, 5)).map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{transaction.date}</td>
                  <td className="px-4 py-2">{transaction.reference}</td>
                  <td className="px-4 py-2">{transaction.invoiceNo}</td>
                  <td className="px-4 py-2 text-right">${transaction.debitAmount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">${transaction.creditAmount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">${transaction.balance.toLocaleString()}</td>
                  <td className={`px-4 py-2 ${getStatusColor(transaction.status)}`}>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length > 5 && (
          <button
            onClick={() => setShowFullStatement(!showFullStatement)}
            className="mt-4 text-blue-600 hover:text-blue-800 flex items-center"
          >
            {showFullStatement ? (
              <>
                <ChevronUp size={20} className="mr-1" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown size={20} className="mr-1" /> Show More
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default StatementOfAccount;