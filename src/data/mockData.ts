// ... (previous imports and code)

const salesman1CustomerProfiles = [
  {
    id: 1,
    name: 'Acme Corp',
    address: '123 Main St, Anytown, USA',
    billingEntity: 'Acme Billing LLC',
    payer: 'John Doe',
    salesman: 'salesman1',
    creditLimit: 50000,
    outstandingBalance: 35000,
    uenNo: '201234567A',
    agingBuckets: {
      '1-30': 10000,
      '31-60': 15000,
      '61-90': 5000,
      '91-120': 3000,
      '120+': 2000
    },
    recentInvoices: [
      { id: 'INV-001', date: '2024-03-01', amount: 5000 },
      { id: 'INV-002', date: '2024-03-15', amount: 7500 },
      { id: 'INV-003', date: '2024-04-01', amount: 3000 },
    ],
    statementOfAccount: [
      { date: '2024-03-01', reference: 'Product Purchase', invoiceNo: 'INV-001', debitAmount: 5000, creditAmount: 0, balance: 5000, dueDate: '2024-04-01', status: 'Outstanding' },
      { date: '2024-03-10', reference: 'Payment Received', invoiceNo: 'PAY-001', debitAmount: 0, creditAmount: 2000, balance: 3000, dueDate: '', status: 'Paid' },
      { date: '2024-03-15', reference: 'Product Purchase', invoiceNo: 'INV-002', debitAmount: 7500, creditAmount: 0, balance: 10500, dueDate: '2024-04-15', status: 'Outstanding' },
      { date: '2024-04-01', reference: 'Product Purchase', invoiceNo: 'INV-003', debitAmount: 3000, creditAmount: 0, balance: 13500, dueDate: '2024-05-01', status: 'Outstanding' },
      { date: '2024-04-10', reference: 'Payment Received', invoiceNo: 'PAY-002', debitAmount: 0, creditAmount: 5000, balance: 8500, dueDate: '', status: 'Paid' },
    ],
    creditTerms: 'Net 30',
    nextDueDate: '2024-05-01',
    creditStatus: 'Good',
  },
  // ... (update other customer profiles with new credit information)
];

// ... (rest of the file remains unchanged)