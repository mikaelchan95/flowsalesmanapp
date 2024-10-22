import React from 'react';
import { X, Package, Truck, CheckCircle } from 'lucide-react';
import { Order } from '../data/types';
import { formatDate, formatCurrency } from '../utils/helpers';

interface OrderDetailsProps {
  order: Order | undefined;
  onClose: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onClose }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Package className="text-blue-500" />;
      case 'In Transit':
        return <Truck className="text-yellow-500" />;
      case 'Delivered':
        return <CheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  if (!order) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Invoice Number:</p>
              <p>{order.invoiceNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Customer:</p>
              <p>{order.customerName}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span>{order.status}</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Order Date:</p>
              <p>{formatDate(order.orderDate)}</p>
            </div>
            <div>
              <p className="font-semibold">Estimated Delivery:</p>
              <p>
                {order.status === 'Delivered'
                  ? formatDate(order.deliveryDate!)
                  : `${formatDate(order.estimatedDeliveryStart)} - ${formatDate(order.estimatedDeliveryEnd)}`}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Items:</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{item.productName}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{formatCurrency(item.price)}</td>
                    <td className="px-4 py-2">
                      {item.isConsignment ? 'Consignment' : item.isDutyFree ? 'Duty-Free' : 'Duty-Paid'}
                    </td>
                    <td className="px-4 py-2">{formatCurrency(item.quantity * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Subtotal:</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">GST (9%):</span>
            <span>{formatCurrency(order.gst)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;