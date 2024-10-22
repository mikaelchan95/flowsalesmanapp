import { useState, useCallback } from 'react';
import { Customer, CustomerType } from '../../../data/types';

export const useAddCustomerForm = (onSubmit: (customer: Customer) => void) => {
  const [formData, setFormData] = useState<Partial<Customer>>({
    name: '',
    type: CustomerType.Restaurant,
    address: '',
    billingEntity: '',
    payer: '',
    creditLimit: 0,
    uenNo: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'creditLimit' ? parseFloat(value) : value,
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Customer);
  }, [formData, onSubmit]);

  return { formData, handleChange, handleSubmit };
};