import { Customer, StatementEntry } from '../../data/types';

export interface CustomerInfoProps {
  customer: Customer;
  className?: string;
}

export interface CreditInfoProps {
  customer: Customer;
  className?: string;
}

export interface RecentInvoicesProps {
  invoices: Customer['recentInvoices'];
}

export interface StatementOfAccountProps {
  customer: Customer;
  transactions: StatementEntry[];
  showFullStatement: boolean;
  setShowFullStatement: (show: boolean) => void;
  getStatusColor: (status: string) => string;
  className?: string;
}