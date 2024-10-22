import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Search } from 'lucide-react';
import { Product, Customer } from '../data/types';
import { formatCurrency } from '../utils/helpers';
import { addOrder, addQuotation } from '../data/orders';
import { toast } from 'react-hot-toast';
import { getCustomersForSalesman } from '../data/customers';

interface CartProps {
  cart: { product: Product; quantity: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ product: Product; quantity: number }[]>>;
}

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState<'invoice' | 'quotation'>('invoice');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [quotationNumber, setQuotationNumber] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser') || '';
    const fetchedCustomers = getCustomersForSalesman(currentUser);
    setCustomers(fetchedCustomers);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setInvoiceNumber(`INV-${Date.now()}`);
      setQuotationNumber(`QUO-${Date.now()}`);
    }
  }, [isOpen]);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    if (!selectedCustomer) {
      toast.error('Please select a customer');
      return;
    }

    const newOrder = {
      invoiceNumber: orderType === 'invoice' ? invoiceNumber : '',
      quotationNumber: orderType === 'quotation' ? quotationNumber : '',
      customerName: selectedCustomer.name,
      status: orderType === 'invoice' ? 'Processing' : 'Quotation',
      orderDate: new Date().toISOString(),
      estimatedDeliveryStart: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDeliveryEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      subtotal: total,
      gst: total * 0.09,
      total: total * 1.09,
      items: cart.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        isDutyFree: false,
        isConsignment: false
      })),
    };

    if (orderType === 'invoice') {
      addOrder(newOrder);
      toast.success(`Invoice ${invoiceNumber} created successfully for ${selectedCustomer.name}`);
    } else {
      addQuotation(newOrder);
      toast.success(`Quotation ${quotationNumber} created successfully for ${selectedCustomer.name}`);
    }

    setCart([]);
    setIsOpen(false);
    setSelectedCustomer(null);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.uenNo.toLowerCase().includes(customerSearch.toLowerCase())
  );

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center mb-2">
                    <span>{item.product.name}</span>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center border rounded mr-2"
                      />
                      <span className="mr-2">{formatCurrency(item.product.price * item.quantity)}</span>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-red-500">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="font-bold">Total: {formatCurrency(total)}</p>
                </div>
                <div className="mt-4">
                  <label className="block mb-2">Customer:</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerSearch}
                      onChange={(e) => {
                        setCustomerSearch(e.target.value);
                        setShowCustomerDropdown(true);
                      }}
                      placeholder="Search customers..."
                      className="w-full p-2 border rounded"
                    />
                    <button
                      className="absolute right-2 top-2 text-gray-500"
                      onClick={() => setShowCustomerDropdown(!showCustomerDropdown)}
                    >
                      <Search size={20} />
                    </button>
                    {showCustomerDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                        {filteredCustomers.map((customer) => (
                          <div
                            key={customer.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setSelectedCustomer(customer);
                              setCustomerSearch(customer.name);
                              setShowCustomerDropdown(false);
                            }}
                          >
                            {customer.name} ({customer.uenNo})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedCustomer && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected: {selectedCustomer.name} ({selectedCustomer.uenNo})
                    </p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block mb-2">Order Type:</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="invoice"
                        checked={orderType === 'invoice'}
                        onChange={() => setOrderType('invoice')}
                        className="form-radio"
                      />
                      <span className="ml-2">Invoice</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="quotation"
                        checked={orderType === 'quotation'}
                        onChange={() => setOrderType('quotation')}
                        className="form-radio"
                      />
                      <span className="ml-2">Quotation</span>
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <p>
                    {orderType === 'invoice' ? `Invoice Number: ${invoiceNumber}` : `Quotation Number: ${quotationNumber}`}
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;