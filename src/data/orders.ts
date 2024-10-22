import { Order } from './types';

let orders: Order[] = [
  // ... (existing mock orders)
];

let quotations: Order[] = [];

export const getOrders = (): Order[] => {
  return orders;
};

export const getOrdersForCustomer = (customerId: number): Order[] => {
  // In a real application, you would filter the orders based on the customerId
  // For this example, we'll return all orders
  return orders;
};

export const addOrder = (newOrder: Order): void => {
  orders = [newOrder, ...orders];
};

export const addQuotation = (newQuotation: Order): void => {
  quotations = [newQuotation, ...quotations];
};

export const getQuotations = (): Order[] => {
  return quotations;
};

export const getRecentOrdersForCustomer = (customerId: number, limit: number = 5): Order[] => {
  return getOrdersForCustomer(customerId)
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    .slice(0, limit);
};

export const updateOrderStatus = (invoiceNumber: string, newStatus: string): Order[] => {
  orders = orders.map(order => 
    order.invoiceNumber === invoiceNumber 
      ? { ...order, status: newStatus } 
      : order
  );
  return orders;
};

export const convertQuotationToOrder = (quotationNumber: string): void => {
  const quotation = quotations.find(q => q.quotationNumber === quotationNumber);
  if (quotation) {
    const newOrder: Order = {
      ...quotation,
      invoiceNumber: `INV-${Date.now()}`,
      status: 'Processing',
      orderDate: new Date().toISOString(),
    };
    addOrder(newOrder);
    quotations = quotations.filter(q => q.quotationNumber !== quotationNumber);
  }
};