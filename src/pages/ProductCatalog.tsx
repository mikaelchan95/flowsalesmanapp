import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { getProductCategories, getFilteredProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { Product } from '../data/types';

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

  const categories = getProductCategories();
  const filteredProducts = getFilteredProducts(searchTerm, selectedCategory);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity } : item
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity === 0) {
        return prevCart.filter(item => item.product.id !== productId);
      }
      return prevCart.map(item => 
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const getQuantityInCart = (productId: number) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Catalog</h1>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div className="flex items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input px-4 py-2 w-full md:w-64 rounded-l-md"
          />
          <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition duration-200">
            <Search size={20} />
          </button>
        </div>
        <div className="flex items-center w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-select px-4 py-2 w-full md:w-48 rounded-l-md"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300 transition duration-200">
            <Filter size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            updateQuantity={updateQuantity}
            quantity={getQuantityInCart(product.id)}
          />
        ))}
      </div>
      <Cart cart={cart} setCart={setCart} />
    </div>
  );
};

export default ProductCatalog;