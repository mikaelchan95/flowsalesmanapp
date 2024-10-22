import { Customer, CustomerType } from '../../../data/types';
import Papa from 'papaparse';

export const exportToCSV = (customers: Customer[]) => {
  const csv = Papa.unparse(customers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "customer_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const importFromCSV = (file: File, callback: (customers: Customer[]) => void) => {
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      const importedCustomers: Customer[] = results.data.map((row: any, index: number) => ({
        id: Date.now() + index, // Generate a unique ID
        name: row.name,
        type: row.type as CustomerType,
        address: row.address,
        billingEntity: row.billingEntity,
        payer: row.payer,
        creditLimit: parseFloat(row.creditLimit),
        outstandingBalance: parseFloat(row.outstandingBalance),
        uenNo: row.uenNo,
        phoneNumber: row.phoneNumber,
        email: row.email,
        salesman: localStorage.getItem('currentUser') || '',
        agingBuckets: {
          '1-30': 0,
          '31-60': 0,
          '61-90': 0,
          '91-120': 0,
          '120+': 0
        },
        recentInvoices: [],
        statementOfAccount: [],
        preferences: {
          preferredContactMethod: '',
          preferredDeliveryTime: '',
          specialInstructions: ''
        },
        leadStatus: '',
        followUpDate: ''
      }));
      callback(importedCustomers);
    }
  });
};