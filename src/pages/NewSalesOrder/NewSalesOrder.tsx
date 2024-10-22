import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { ShoppingCart, FileText, DollarSign, User, Calendar } from 'lucide-react';
import { getCustomersForSalesman, getCustomerProfileForSalesman, updateCustomerProfile } from '../../data/customers';
import { products, updateProductStock } from '../../data/products';
import { addOrder, addQuotation } from '../../data/orders';
import CustomerSearch from './components/CustomerSearch';
import OrderItems from './components/OrderItems';
import { calculateTotalAmount, calculateGST, calculateTotalWithGST } from '../../utils/helpers';
import { Customer, Product } from '../../data/types';

const NewSalesOrder: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<Array<{ product: Product; quantity: number; isDutyFree: boolean; isConsignment: boolean }>>([]);
  const [productSearch, setProductSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [orderType, setOrderType] = useState<'quotation' | 'invoice'>('invoice');
  const [quotationNumber, setQuotationNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);

  const currentUser = localStorage.getItem('currentUser') || '';
  const customers = getCustomersForSalesman(currentUser);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  useEffect(() => {
    setInvoiceNumber(`INV-${Date.now()}`);
    setQuotationNumber(`QUO-${Date.now()}`);
  }, []);

  const addItem = (product: Product, isDutyFree: boolean, isConsignment: boolean) => {
    setItems([...items, { product, quantity: 1, isDutyFree, isConsignment }]);
    setProductSearch('');
    setShowProductDropdown(false);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = quantity;
    setItems(updatedItems);
  };

  const subtotal = calculateTotalAmount(items);
  const gst = calculateGST(subtotal);
  const total = calculateTotalWithGST(subtotal);

  useEffect(() => {
    setShowCustomerDropdown(customerSearch !== '');
  }, [customerSearch]);

  useEffect(() => {
    setShowProductDropdown(productSearch !== '');
  }, [productSearch]);

  const updateCustomerAndStock = (customerId: number, orderItems: typeof items, orderTotal: number, invoiceNumber: string) => {
    const customerProfile = getCustomerProfileForSalesman(customerId, currentUser);
    if (customerProfile) {
      const updatedCustomer = {
        ...customerProfile,
        outstandingBalance: customerProfile.outstandingBalance + orderTotal,
        recentInvoices: [
          { id: invoiceNumber, date: orderDate, amount: orderTotal },
          ...customerProfile.recentInvoices.slice(0, 2)
        ],
        statementOfAccount: [
          {
            date: orderDate,
            reference: 'Product Purchase',
            invoiceNo: invoiceNumber,
            debitAmount: orderTotal,
            creditAmount: 0,
            balance: customerProfile.outstandingBalance + orderTotal,
            dueDate: new Date(new Date(orderDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'Outstanding'
          },
          ...customerProfile.statementOfAccount
        ]
      };
      updateCustomerProfile(updatedCustomer);
    }

    orderItems.forEach(item => {
      updateProductStock(item.product.id, item.quantity, item.isDutyFree, item.isConsignment);
    });
  };

  const handleCreateOrder = () => {
    if (!selectedCustomer) {
      toast.error(t('newOrder.selectCustomerError'));
      return;
    }

    if (items.length === 0) {
      toast.error(t('newOrder.addItemsError'));
      return;
    }

    const newOrder = {
      invoiceNumber: orderType === 'invoice' ? invoiceNumber : '',
      quotationNumber: orderType === 'quotation' ? quotationNumber : '',
      customerName: selectedCustomer.name,
      status: orderType === 'invoice' ? 'Processing' : 'Quotation',
      orderDate: orderDate,
      estimatedDeliveryStart: new Date(new Date(orderDate).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estimatedDeliveryEnd: new Date(new Date(orderDate).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subtotal,
      gst,
      total,
      items: items.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        isDutyFree: item.isDutyFree,
        isConsignment: item.isConsignment
      })),
    };

    if (orderType === 'invoice') {
      addOrder(newOrder);
      updateCustomerAndStock(selectedCustomer.id, items, total, invoiceNumber);
      toast.success(t('newOrder.invoiceCreated', { invoiceNumber }));
    } else {
      addQuotation(newOrder);
      toast.success(t('newOrder.quotationCreated', { quotationNumber }));
    }

    setSelectedCustomer(null);
    setItems([]);
    setQuotationNumber('');
    setInvoiceNumber(`INV-${Date.now()}`);
    setQuotationNumber(`QUO-${Date.now()}`);
    setOrderDate(new Date().toISOString().split('T')[0]);

    navigate('/order-tracking');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('newOrder.title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="mr-2" /> {t('newOrder.customerInfo')}
            </h2>
            <CustomerSearch
              customerSearch={customerSearch}
              setCustomerSearch={setCustomerSearch}
              showCustomerDropdown={showCustomerDropdown}
              filteredCustomers={filteredCustomers}
              setSelectedCustomer={setSelectedCustomer}
              setShowCustomerDropdown={setShowCustomerDropdown}
            />
            {selectedCustomer && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <p className="font-semibold">{t('newOrder.selectedCustomer')}: {selectedCustomer.name}</p>
                <p>{t('newOrder.customerUEN')}: {selectedCustomer.uenNo}</p>
                <p>{t('newOrder.customerAddress')}: {selectedCustomer.address}</p>
              </div>
            )}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="mr-2" /> {t('newOrder.orderItems')}
            </h2>
            <OrderItems
              productSearch={productSearch}
              setProductSearch={setProductSearch}
              showProductDropdown={showProductDropdown}
              filteredProducts={filteredProducts}
              addItem={addItem}
              items={items}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" /> {t('newOrder.orderDetails')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('newOrder.orderType')}</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="orderType"
                      value="invoice"
                      checked={orderType === 'invoice'}
                      onChange={() => setOrderType('invoice')}
                    />
                    <span className="ml-2">{t('newOrder.invoice')}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="orderType"
                      value="quotation"
                      checked={orderType === 'quotation'}
                      onChange={() => setOrderType('quotation')}
                    />
                    <span className="ml-2">{t('newOrder.quotation')}</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {orderType === 'invoice' ? t('newOrder.invoiceNumber') : t('newOrder.quotationNumber')}
                </label>
                <input
                  type="text"
                  value={orderType === 'invoice' ? invoiceNumber : quotationNumber}
                  readOnly
                  className="form-input w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('newOrder.orderDate')}</label>
                <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
                  <Calendar className="mr-2 text-gray-500" size={20} />
                  <input
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DollarSign className="mr-2" /> {t('newOrder.orderSummary')}
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t('newOrder.subtotal')}:</span>
                <span>{t('common.currency', { value: subtotal.toFixed(2) })}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('newOrder.gst')}:</span>
                <span>{t('common.currency', { value: gst.toFixed(2) })}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>{t('newOrder.total')}:</span>
                <span>{t('common.currency', { value: total.toFixed(2) })}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCreateOrder}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
          >
            <FileText className="mr-2" />
            {orderType === 'invoice' ? t('newOrder.createInvoice') : t('newOrder.createQuotation')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSalesOrder;