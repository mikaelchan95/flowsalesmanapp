import React, { useState } from 'react';
import { Clock, ShoppingCart } from 'lucide-react';
import { Order } from '../../../data/types';
import { getOrdersForCustomer } from '../../../data/orders';
import { addOrder } from '../../../data/orders';
import { formatDate, formatCurrency } from '../../../utils/helpers';
import { toast } from 'react-hot-toast';

interface FastReorderProps {
  customerId: number;
  customerName: string;
  className?: string;
}

const FastReorder: React.FC<FastReorderProps> = ({ customerId, customerName, className }) => {
  const [recentOrders, setRecentOrders] = useState<Order[]>(
    getOrdersForCustomer(customerId).slice(0, 5)
  );

  const handleReorder = (order: Order) => {
    const newOrder: Order = {
      ...order,
      invoiceNumber: `INV-${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: 'Processing',
      estimatedDeliveryStart: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDeliveryEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    };

    addOrder(newOrder);
    toast.success('Order placed successfully!');
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Fast Reorder</h2>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.invoiceNumber} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-semibold">{order.invoiceNumber}</p>
                <p className="text-sm text-gray-600">{formatDate(order.orderDate)}</p>
                <p>{formatCurrency(order.total)}</p>
              </div>
              <button
                onClick={() => handleReorder(order)}
                className="btn btn-primary flex items-center space-x-2"
              >
                <ShoppingCart size={16} />
                <span>Reorder</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FastReorder;