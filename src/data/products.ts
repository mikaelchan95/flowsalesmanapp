import { Product } from './types';

export let products: Product[] = [
  { id: 1, name: 'Red Wine', sku: 'RW001', category: 'Wines', uom: 'Bottle', price: 29.99, dutyFreeStock: 50, dutyPaidStock: 50, consignmentStock: 20, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
  { id: 2, name: 'White Wine', sku: 'WW001', category: 'Wines', uom: 'Bottle', price: 24.99, dutyFreeStock: 75, dutyPaidStock: 75, consignmentStock: 15, image: 'https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80' },
  { id: 3, name: 'Vodka', sku: 'V001', category: 'Spirits', uom: 'Bottle', price: 34.99, dutyFreeStock: 40, dutyPaidStock: 40, consignmentStock: 10, image: 'https://images.unsplash.com/photo-1614963326505-843868e1d83a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
  { id: 4, name: 'Whiskey', sku: 'W001', category: 'Spirits', uom: 'Bottle', price: 49.99, dutyFreeStock: 30, dutyPaidStock: 30, consignmentStock: 5, image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80' },
  { id: 5, name: 'Sparkling Water', sku: 'SW001', category: 'Non-alcoholic', uom: 'Can', price: 1.99, dutyFreeStock: 250, dutyPaidStock: 250, consignmentStock: 100, image: 'https://images.unsplash.com/photo-1600384060219-7fa3bb862d13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
  { id: 6, name: 'Craft Beer', sku: 'CB001', category: 'Beers', uom: 'Can', price: 3.99, dutyFreeStock: 100, dutyPaidStock: 100, consignmentStock: 50, image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' },
];

export const updateProductStock = (productId: number, quantitySold: number, isDutyFree: boolean, isConsignment: boolean): void => {
  const product = products.find(p => p.id === productId);
  if (product) {
    if (isConsignment) {
      product.consignmentStock -= quantitySold;
    } else if (isDutyFree) {
      product.dutyFreeStock -= quantitySold;
    } else {
      product.dutyPaidStock -= quantitySold;
    }
  }
};

export const getProductCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return ['All', ...Array.from(categories)];
};

export const getFilteredProducts = (searchTerm: string, category: string): Product[] => {
  return products.filter(product =>
    (category === 'All' || product.category === category) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};