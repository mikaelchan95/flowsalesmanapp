import { useState, useEffect, useCallback } from 'react';
import { Customer } from '../../../data/types';
import { dummyCustomers } from '../../../data/dummyCustomers';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Use dummy customers instead of fetching from an API
    setCustomers(dummyCustomers);
  }, []);

  const addCustomer = useCallback((newCustomer: Customer) => {
    setCustomers(prevCustomers => [...prevCustomers, { ...newCustomer, id: prevCustomers.length + 1 }]);
    // In a real application, you would also make an API call to add the customer to the backend
  }, []);

  return { customers, addCustomer };
};