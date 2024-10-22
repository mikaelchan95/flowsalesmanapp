import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Package, DollarSign, Box } from 'lucide-react';
import { Product } from '../data/types';
import { formatCurrency } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  quantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, updateQuantity, quantity }) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    setLocalQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      addToCart(product, 1);
    } else {
      updateQuantity(product.id, localQuantity);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
          {product.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Package size={16} className="mr-1" />
            <span>SKU: {product.sku}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Box size={16} className="mr-1" />
            <span>UOM: {product.uom}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign size={16} className="mr-1" />
            <span className="font-bold text-black">{formatCurrency(product.price)}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
          <div className="bg-gray-100 p-2 rounded">
            <p className="font-semibold">Duty Free</p>
            <p>{product.dutyFreeStock}</p>
          </div>
          <div className="bg-gray-200 p-2 rounded">
            <p className="font-semibold">Duty Paid</p>
            <p>{product.dutyPaidStock}</p>
          </div>
          <div className="bg-gray-300 p-2 rounded">
            <p className="font-semibold">Consignment</p>
            <p>{product.consignmentStock}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border rounded">
            <button
              onClick={() => handleQuantityChange(Math.max(0, localQuantity - 1))}
              className="bg-gray-200 text-gray-700 py-1 px-3 rounded-l hover:bg-gray-300 transition duration-200"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              min="0"
              value={localQuantity}
              onChange={(e) => handleQuantityChange(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-16 text-center border-t border-b border-gray-200"
            />
            <button
              onClick={() => handleQuantityChange(localQuantity + 1)}
              className="bg-gray-200 text-gray-700 py-1 px-3 rounded-r hover:bg-gray-300 transition duration-200"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200 flex items-center justify-center"
        >
          <ShoppingCart size={20} className="mr-2" />
          {quantity === 0 ? 'Add to Cart' : 'Update Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;