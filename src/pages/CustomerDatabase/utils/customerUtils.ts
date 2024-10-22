import { Customer } from '../../../data/types';

export const filterCustomers = (customers: Customer[], searchTerm: string): Customer[] => {
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  return customers.filter(customer =>
    customer.name.toLowerCase().includes(lowercasedSearchTerm) ||
    customer.uenNo.toLowerCase().includes(lowercasedSearchTerm) ||
    customer.type.toLowerCase().includes(lowercasedSearchTerm)
  );
};