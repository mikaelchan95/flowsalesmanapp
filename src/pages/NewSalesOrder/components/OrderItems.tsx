import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, Plus, Minus, Search } from 'lucide-react';
import { Product } from '../../../data/types';
import { formatCurrency } from '../../../utils/helpers';

interface OrderItemsProps {
  productSearch: string;
  setProductSearch: (search: string) => void;
  showProductDropdown: boolean;
  filteredProducts: Product[];
  addItem: (product: Product, isDutyFree: boolean, isConsignment: boolean) => void;
  items: Array<{ product: Product; quantity: number; isDutyFree: boolean; isConsignment: boolean }>;
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
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder={t('newOrder.searchProducts')}
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        {showProductDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredProducts.map((product) => (
              <div key={product.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => addItem(product, true, false)}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    >
                      {t('newOrder.dutyFree')}
                    </button>
                    <button
                      onClick={() => addItem(product, false, false)}
                      className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                    >
                      {t('newOrder.dutyPaid')}
                    </button>
                    <button
                      onClick={() => addItem(product, false, true)}
                      className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                    >
                      {t('newOrder.consignment')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            <div className="flex-grow">
              <p className="font-semibold">{item.product.name}</p>
              <p className="text-sm text-gray-600">
                {formatCurrency(item.product.price)} - 
                {item.isDutyFree ? t('newOrder.dutyFree') : item.isConsignment ? t('newOrder.consignment') : t('newOrder.dutyPaid')}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded bg-white">
                <button
                  onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition duration-200"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(index, Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-l border-r"
                />
                <button
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition duration-200"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;