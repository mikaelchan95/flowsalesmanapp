import React from 'react';
import { Package, Truck, CheckCircle, Info, Download, DollarSign, FileText } from 'lucide-react';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import { updateOrderStatus, convertQuotationToOrder, getOrders, getQuotations } from '../../../data/orders';
import { generateInvoicePDF } from '../../CustomerProfile/utils/pdfGenerator';
import { toast } from 'react-hot-toast';
import { updateCustomerAfterPayment } from '../../../data/customers';
import { Order } from '../../../data/types';

interface OrderTableProps {
  items: Order[];
  showQuotations: boolean;
  onItemSelect: (item: Order) => void;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setQuotations: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrderTable: React.FC<OrderTableProps> = ({ items, showQuotations, onItemSelect, setOrders, setQuotations }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Package className="text-blue-500" />;
      case 'In Transit':
        return <Truck className="text-yellow-500" />;
      case 'Delivered':
        return <CheckCircle className="text-green-500" />;
      case 'Quotation':
        return <FileText className="text-purple-500" />;
      default:
        return null;
    }
  };

  const handleDownloadInvoice = (order: Order) => {
    generateInvoicePDF(order);
  };

  const handlePaymentMade = (order: Order) => {
    const updatedOrders = updateOrderStatus(order.invoiceNumber, 'Paid');
    setOrders(updatedOrders);
    updateCustomerAfterPayment(order.customerName, order.total, order.invoiceNumber);
    toast.success('Payment recorded successfully!');
  };

  const handleConvertQuotation = (quotation: Order) => {
    convertQuotationToOrder(quotation.quotationNumber);
    setQuotations(getQuotations());
    setOrders(getOrders());
    toast.success('Quotation converted to order successfully!');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {showQuotations ? 'Quotation Number' : 'Invoice Number'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.invoiceNumber} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                {showQuotations ? item.quotationNumber : item.invoiceNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.customerName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getStatusIcon(item.status)}
                  <span className="ml-2">{item.status}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.orderDate)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.total)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onItemSelect(item)}
                    className="text-blue-600 hover:text-blue-900"
                    title="View Details"
                  >
                    <Info size={20} />
                  </button>
                  {!showQuotations && (
                    <>
                      <button
                        onClick={() => handleDownloadInvoice(item)}
                        className="text-green-600 hover:text-green-900"
                        title="Download Invoice"
                      >
                        <Download size={20} />
                      </button>
                      {item.status !== 'Paid' && (
                        <button
                          onClick={() => handlePaymentMade(item)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Mark as Paid"
                        >
                          <DollarSign size={20} />
                        </button>
                      )}
                    </>
                  )}
                  {showQuotations && (
                    <button
                      onClick={() => handleConvertQuotation(item)}
                      className="text-purple-600 hover:text-purple-900"
                      title="Convert to Order"
                    >
                      <FileText size={20} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;