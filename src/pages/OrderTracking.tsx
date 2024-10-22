import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Search, Info, Download, DollarSign, FileText } from 'lucide-react';
import { getOrders, getQuotations, updateOrderStatus, convertQuotationToOrder } from '../data/orders';
import { formatDate, formatCurrency } from '../utils/helpers';
import OrderDetails from '../components/OrderDetails';
import { generateInvoicePDF } from './CustomerProfile/utils/pdfGenerator';
import { toast } from 'react-hot-toast';
import { updateCustomerAfterPayment } from '../data/customers';

const OrderTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState(getOrders());
  const [quotations, setQuotations] = useState(getQuotations());
  const [showQuotations, setShowQuotations] = useState(false);

  const filteredItems = (showQuotations ? quotations : orders).filter(item =>
    item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDownloadInvoice = (order: any) => {
    generateInvoicePDF(order);
  };

  const handlePaymentMade = (order: any) => {
    const updatedOrders = updateOrderStatus(order.invoiceNumber, 'Paid');
    setOrders(updatedOrders);
    updateCustomerAfterPayment(order.customerName, order.total, order.invoiceNumber);
    toast.success('Payment recorded successfully!');
  };

  const handleConvertQuotation = (quotation: any) => {
    convertQuotationToOrder(quotation.quotationNumber);
    setQuotations(getQuotations());
    setOrders(getOrders());
    toast.success('Quotation converted to order successfully!');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Order Tracking</h1>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by Invoice/Quotation Number or Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input flex-grow"
        />
        <button className="btn btn-primary">
          <Search size={20} />
        </button>
        <button
          className={`btn ${showQuotations ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => setShowQuotations(false)}
        >
          Orders
        </button>
        <button
          className={`btn ${showQuotations ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setShowQuotations(true)}
        >
          Quotations
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Invoice/Quotation Number</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Order Date</th>
                  <th className="px-4 py-2 text-left">Estimated Delivery</th>
                  <th className="px-4 py-2 text-left">Subtotal</th>
                  <th className="px-4 py-2 text-left">GST (9%)</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.invoiceNumber} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{showQuotations ? item.quotationNumber : item.invoiceNumber}</td>
                    <td className="px-4 py-2">{item.customerName}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <span>{item.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">{formatDate(item.orderDate)}</td>
                    <td className="px-4 py-2">
                      {item.status === 'Delivered'
                        ? formatDate(item.deliveryDate!)
                        : `${formatDate(item.estimatedDeliveryStart)} - ${formatDate(item.estimatedDeliveryEnd)}`}
                    </td>
                    <td className="px-4 py-2">{formatCurrency(item.subtotal)}</td>
                    <td className="px-4 py-2">{formatCurrency(item.gst)}</td>
                    <td className="px-4 py-2">{formatCurrency(item.total)}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedOrder(item.invoiceNumber)}
                          className="btn btn-secondary flex items-center space-x-1"
                        >
                          <Info size={16} />
                          <span>Details</span>
                        </button>
                        {!showQuotations && (
                          <>
                            <button
                              onClick={() => handleDownloadInvoice(item)}
                              className="btn btn-primary flex items-center space-x-1"
                            >
                              <Download size={16} />
                              <span>Invoice</span>
                            </button>
                            {item.status !== 'Paid' && (
                              <button
                                onClick={() => handlePaymentMade(item)}
                                className="btn btn-success flex items-center space-x-1"
                              >
                                <DollarSign size={16} />
                                <span>Payment Made</span>
                              </button>
                            )}
                          </>
                        )}
                        {showQuotations && (
                          <button
                            onClick={() => handleConvertQuotation(item)}
                            className="btn btn-success flex items-center space-x-1"
                          >
                            <FileText size={16} />
                            <span>Convert to Order</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <OrderDetails
          order={orders.find(o => o.invoiceNumber === selectedOrder) || quotations.find(q => q.quotationNumber === selectedOrder)}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderTracking;