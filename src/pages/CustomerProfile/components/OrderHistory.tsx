import React, { useState } from 'react';
import { getOrdersForCustomer } from '../../../data/orders';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import { Download } from 'lucide-react';
import { generateInvoicePDF } from '../utils/pdfGenerator';

interface OrderHistoryProps {
  customerId: number;
  className?: string;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ customerId, className }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const orders = getOrdersForCustomer(customerId);

  const handleDownloadInvoice = (order: any) => {
    generateInvoicePDF(order);
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.invoiceNumber} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="cursor-pointer" onClick={() => setExpandedOrder(expandedOrder === order.invoiceNumber ? null : order.invoiceNumber)}>
                  <p className="font-semibold">{order.invoiceNumber}</p>
                  <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-semibold">{formatCurrency(order.total)}</p>
                    <p className={`text-sm ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</p>
                  </div>
                  <button
                    onClick={() => handleDownloadInvoice(order)}
                    className="btn btn-secondary flex items-center space-x-1"
                    title="Download Invoice"
                  >
                    <Download size={16} />
                    <span className="hidden sm:inline">Invoice</span>
                  </button>
                </div>
              </div>
              {expandedOrder === order.invoiceNumber && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Order Items:</h3>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Product</th>
                        <th className="text-left">Quantity</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>{formatCurrency(item.quantity * item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;