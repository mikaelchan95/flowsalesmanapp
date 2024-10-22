import { HistoricalPricing } from './types';

export const historicalPricingData: HistoricalPricing[] = [
  { id: 1, productId: 1, date: '2024-01-15', customerName: 'Acme Corp', price: 28.99 },
  { id: 2, productId: 1, date: '2024-02-01', customerName: 'TechSolutions Inc', price: 29.99 },
  { id: 3, productId: 1, date: '2024-02-15', customerName: 'Global Traders Ltd', price: 27.99 },
  { id: 4, productId: 1, date: '2024-03-01', customerName: 'Acme Corp', price: 29.99 },
  { id: 5, productId: 1, date: '2024-03-15', customerName: 'TechSolutions Inc', price: 30.99 },
  // Add more historical pricing data for other products...
];

export const getHistoricalPricingForProduct = (productId: number): HistoricalPricing[] => {
  return historicalPricingData.filter(entry => entry.productId === productId);
};