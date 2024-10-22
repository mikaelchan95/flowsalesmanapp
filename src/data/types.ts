import { CustomerType } from './customerTypes';

export { CustomerType };

export interface Customer {
  id: number;
  name: string;
  type: CustomerType;
  address: string;
  billingEntity: string;
  payer: string;
  salesman: string;
  creditLimit: number;
  outstandingBalance: number;
  uenNo: string;
  phoneNumber: string;
  email: string;
  agingBuckets: {
    '1-30': number;
    '31-60': number;
    '61-90': number;
    '91-120': number;
    '120+': number;
  };
  recentInvoices: Invoice[];
  statementOfAccount: StatementEntry[];
  preferences: {
    preferredContactMethod: string;
    preferredDeliveryTime: string;
    specialInstructions: string;
  };
  leadStatus: string;
  followUpDate: string;
  creditTerms: string;
  nextDueDate: string;
  creditStatus: 'Good' | 'Warning' | 'Suspended';
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
}

export interface StatementEntry {
  date: string;
  reference: string;
  invoiceNo: string;
  debitAmount: number;
  creditAmount: number;
  balance: number;
  dueDate: string;
  status: string;
}

// ... (rest of the file remains unchanged)