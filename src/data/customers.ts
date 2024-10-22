import { Customer } from './types';
import { dummyCustomers } from './dummyCustomers';

// Initialize the customers array with dummy data
let customers: Customer[] = [...dummyCustomers];

export const getCustomersForSalesman = (salesman: string) => {
  return customers.filter(customer => customer.salesman === salesman);
};

export const getCustomerProfileForSalesman = (customerId: number, salesman: string): Customer | undefined => {
  return customers.find(customer => customer.id === customerId && customer.salesman === salesman);
};

export const updateCustomerProfile = (updatedCustomer: Customer): void => {
  const index = customers.findIndex(customer => customer.id === updatedCustomer.id);
  if (index !== -1) {
    customers[index] = updatedCustomer;
  }
};

export const updateCustomerAfterPayment = (customerName: string, paymentAmount: number, invoiceNumber: string): void => {
  const customer = customers.find(c => c.name === customerName);
  if (customer) {
    customer.outstandingBalance -= paymentAmount;
    customer.statementOfAccount.push({
      date: new Date().toISOString(),
      reference: 'Payment Received',
      invoiceNo: invoiceNumber,
      debitAmount: 0,
      creditAmount: paymentAmount,
      balance: customer.outstandingBalance,
      dueDate: '',
      status: 'Paid'
    });
    // Update aging buckets (this is a simplified version, you might need to adjust based on your specific requirements)
    customer.agingBuckets['1-30'] = Math.max(0, customer.agingBuckets['1-30'] - paymentAmount);
  }
};

// Function to add a new customer
export const addCustomer = (newCustomer: Customer): void => {
  const maxId = Math.max(...customers.map(c => c.id));
  newCustomer.id = maxId + 1;
  customers.push(newCustomer);
};

// Function to get all customers (for admin purposes)
export const getAllCustomers = (): Customer[] => {
  return customers;
};

// Function to get a customer by ID
export const getCustomerById = (id: number): Customer | undefined => {
  return customers.find(customer => customer.id === id);
};