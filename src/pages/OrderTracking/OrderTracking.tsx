import React, { useState, useEffect } from 'react';
import { getOrders, getQuotations, updateOrderStatus, convertQuotationToOrder } from '../../data/orders';
import OrderTable from './components/OrderTable';
import OrderDetails from './components/OrderDetails';
import SearchBar from './components/SearchBar';
import ToggleButtons from './components/ToggleButtons';
import { Order } from '../../data/types';
import { ShoppingBag, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const OrderTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<Order | null>(null);
  const [orders, setOrders] = useState(getOrders());
  const [quotations, setQuotations] = useState(getQuotations());
  const [showQuotations, setShowQuotations] = useState(false);

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalQuotations, setTotalQuotations] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    setTotalOrders(orders.length);
    setTotalQuotations(quotations.length);
    setTotalRevenue(orders.reduce((sum, order) => sum + order.total, 0));
    setPendingOrders(orders.filter(order => order.status === 'Processing').length);
  }, [orders, quotations]);

  const filteredItems = (showQuotations ? quotations : orders).filter(item =>
    item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelect = (item: Order) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Tracking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Orders</p>
              <p className="text-2xl font-semibold">{totalOrders}</p>
            </div>
            <ShoppingBag className="text-black" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Quotations</p>
              <p className="text-2xl font-semibold">{totalQuotations}</p>
            </div>
            <FileText className="text-black" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-semibold">{formatCurrency(totalRevenue)}</p>
            </div>
            <TrendingUp className="text-black" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
              <p className="text-2xl font-semibold">{pendingOrders}</p>
            </div>
            <AlertCircle className="text-black" size={32} />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ToggleButtons showQuotations={showQuotations} setShowQuotations={setShowQuotations} />
        </div>
        <OrderTable
          items={filteredItems}
          showQuotations={showQuotations}
          onItemSelect={handleItemSelect}
          setOrders={setOrders}
          setQuotations={setQuotations}
        />
      </div>
      
      {selectedItem && (
        <OrderDetails
          item={selectedItem}
          onClose={handleCloseDetails}
          isQuotation={showQuotations}
        />
      )}
    </div>
  );
};

export default OrderTracking;