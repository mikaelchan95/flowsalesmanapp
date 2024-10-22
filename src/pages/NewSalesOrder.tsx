import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import { customers, products } from '../data/mockData';

const NewSalesOrder: React.FC = () => {
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<{ id: number; name: string } | null>(null);
  const [items, setItems] = useState<Array<{ product: { id: number; name: string; price: number }; quantity: number }>>([]);
  const [productSearch, setProductSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const addItem = (product: { id: number; name: string; price: number }) => {
    setItems([...items, { product, quantity: 1 }]);
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

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    setShowCustomerDropdown(customerSearch !== '');
  }, [customerSearch]);

  useEffect(() => {
    setShowProductDropdown(productSearch !== '');
  }, [productSearch]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">New Sales Order</h1>
      <div className="card">
        <div className="card-body space-y-4">
          <CustomerSearch
            customerSearch={customerSearch}
            setCustomerSearch={setCustomerSearch}
            showCustomerDropdown={showCustomerDropdown}
            filteredCustomers={filteredCustomers}
            setSelectedCustomer={setSelectedCustomer}
            setShowCustomerDropdown={setShowCustomerDropdown}
          />
          {selectedCustomer && (
            <div className="text-sm text-gray-600">
              Selected Customer: {selectedCustomer.name}
            </div>
          )}
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
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-success w-full">
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

interface CustomerSearchProps {
  customerSearch: string;
  setCustomerSearch: (search: string) => void;
  showCustomerDropdown: boolean;
  filteredCustomers: Array<{ id: number; name: string }>;
  setSelectedCustomer: (customer: { id: number; name: string } | null) => void;
  setShowCustomerDropdown: (show: boolean) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({
  customerSearch,
  setCustomerSearch,
  showCustomerDropdown,
  filteredCustomers,
  setSelectedCustomer,
  setShowCustomerDropdown
}) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search customers"
      value={customerSearch}
      onChange={(e) => setCustomerSearch(e.target.value)}
      className="form-input w-full"
    />
    {showCustomerDropdown && (
      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSelectedCustomer(customer);
              setCustomerSearch('');
              setShowCustomerDropdown(false);
            }}
          >
            {customer.name}
          </div>
        ))}
      </div>
    )}
  </div>
);

interface OrderItemsProps {
  productSearch: string;
  setProductSearch: (search: string) => void;
  showProductDropdown: boolean;
  filteredProducts: Array<{ id: number; name: string; price: number }>;
  addItem: (product: { id: number; name: string; price: number }) => void;
  items: Array<{ product: { id: number; name: string; price: number }; quantity: number }>;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
}

const OrderItems: React.FC<OrderItemsProps> = ({
  productSearch,
  setProductSearch,
  showProductDropdown,
  filteredProducts,
  addItem,
  items,
  updateQuantity,
  removeItem
}) => (
  <div className="space-y-4">
    <div className="relative">
      <input
        type="text"
        placeholder="Search products"
        value={productSearch}
        onChange={(e) => setProductSearch(e.target.value)}
        className="form-input w-full"
      />
      {showProductDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => addItem(product)}
            >
              {product.name} - ${product.price.toFixed(2)}
            </div>
          ))}
        </div>
      )}
    </div>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="flex-grow">{item.product.name}</span>
          <span>${item.product.price.toFixed(2)}</span>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
            className="form-input w-20"
          />
          <button onClick={() => removeItem(index)} className="text-red-500">
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default NewSalesOrder;