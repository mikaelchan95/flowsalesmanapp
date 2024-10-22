import React, { useRef, useEffect } from 'react';
import { X, Package, Truck, CheckCircle } from 'lucide-react';
import { Order } from '../../../data/types';
import { formatDate, formatCurrency } from '../../../utils/helpers';

interface OrderDetailsProps {
  item: Order;
  onClose: () => void;
  isQuotation: boolean;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ item, onClose, isQuotation }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

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

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{isQuotation ? 'Quotation Details' : 'Order Details'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="font-semibold mb-1">{isQuotation ? 'Quotation Number:' : 'Invoice Number:'}</p>
            <p>{isQuotation ? item.quotationNumber : item.invoiceNumber}</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Customer:</p>
            <p>{item.customerName}</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Status:</p>
            <div className="flex items-center">
              {getStatusIcon(item.status)}
              <span className="ml-2">{item.status}</span>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">Order Date:</p>
            <p>{formatDate(item.orderDate)}</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Estimated Delivery:</p>
            <p>
              {item.status === 'Delivered'
                ? formatDate(item.deliveryDate!)
                : `${formatDate(item.estimatedDeliveryStart)} - ${formatDate(item.estimatedDeliveryEnd)}`}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Order Items:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {item.items.map((orderItem, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{orderItem.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{orderItem.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(orderItem.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {orderItem.isConsignment ? 'Consignment' : orderItem.isDutyFree ? 'Duty-Free' : 'Duty-Paid'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(orderItem.quantity * orderItem.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end space-x-4 text-lg">
          <div>
            <span className="font-semibold">Subtotal:</span>
            <span className="ml-2">{formatCurrency(item.subtotal)}</span>
          </div>
          <div>
            <span className="font-semibold">GST (9%):</span>
            <span className="ml-2">{formatCurrency(item.gst)}</span>
          </div>
          <div>
            <span className="font-semibold">Total:</span>
            <span className="ml-2 text-xl font-bold">{formatCurrency(item.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;