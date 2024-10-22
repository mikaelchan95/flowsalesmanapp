import { Customer, CustomerType } from './types';

export const dummyCustomers: Customer[] = [
  {
    id: 21,
    name: "Jumbo Seafood",
    type: CustomerType.Restaurant,
    address: "1 Fullerton Road, #01-01 One Fullerton, Singapore 049213",
    billingEntity: "Jumbo Group of Restaurants Pte Ltd",
    payer: "Ang Kiam Meng",
    salesman: "salesman1",
    creditLimit: 50000,
    outstandingBalance: 35000,
    uenNo: "199202929W",
    phoneNumber: "+65 6272 2977",
    email: "info@jumboseafood.com.sg",
    agingBuckets: {
      '1-30': 20000,
      '31-60': 10000,
      '61-90': 5000,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-031', date: '2024-05-01', amount: 15000 },
      { id: 'INV-032', date: '2024-05-15', amount: 20000 },
    ],
    statementOfAccount: [
      { date: '2024-05-01', reference: 'Product Purchase', invoiceNo: 'INV-031', debitAmount: 15000, creditAmount: 0, balance: 15000, dueDate: '2024-06-01', status: 'Outstanding' },
      { date: '2024-05-15', reference: 'Product Purchase', invoiceNo: 'INV-032', debitAmount: 20000, creditAmount: 0, balance: 35000, dueDate: '2024-06-15', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "email",
      preferredDeliveryTime: "Morning",
      specialInstructions: "Please deliver to back entrance"
    },
    leadStatus: "Qualified",
    followUpDate: "2024-06-15",
    creditTerms: "Net 30",
    nextDueDate: "2024-06-01",
    creditStatus: "Good"
  },
  {
    id: 22,
    name: "Burnt Ends",
    type: CustomerType.Restaurant,
    address: "7 Dempsey Road #01-04, Singapore 249671",
    billingEntity: "Burnt Ends Pte Ltd",
    payer: "Dave Pynt",
    salesman: "salesman2",
    creditLimit: 30000,
    outstandingBalance: 22000,
    uenNo: "201218080K",
    phoneNumber: "+65 6224 3933",
    email: "reservations@burntends.com.sg",
    agingBuckets: {
      '1-30': 15000,
      '31-60': 7000,
      '61-90': 0,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-033', date: '2024-05-05', amount: 10000 },
      { id: 'INV-034', date: '2024-05-20', amount: 12000 },
    ],
    statementOfAccount: [
      { date: '2024-05-05', reference: 'Product Purchase', invoiceNo: 'INV-033', debitAmount: 10000, creditAmount: 0, balance: 10000, dueDate: '2024-06-05', status: 'Outstanding' },
      { date: '2024-05-20', reference: 'Product Purchase', invoiceNo: 'INV-034', debitAmount: 12000, creditAmount: 0, balance: 22000, dueDate: '2024-06-20', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "phone",
      preferredDeliveryTime: "Afternoon",
      specialInstructions: "Call before delivery"
    },
    leadStatus: "Negotiation",
    followUpDate: "2024-06-10",
    creditTerms: "Net 15",
    nextDueDate: "2024-06-05",
    creditStatus: "Warning"
  },
  {
    id: 23,
    name: "Odette",
    type: CustomerType.Restaurant,
    address: "1 St Andrew's Road, #01-04 National Gallery, Singapore 178957",
    billingEntity: "Odette Pte Ltd",
    payer: "Julien Royer",
    salesman: "salesman1",
    creditLimit: 40000,
    outstandingBalance: 28000,
    uenNo: "201528392R",
    phoneNumber: "+65 6385 0498",
    email: "enquiry@odetterestaurant.com",
    agingBuckets: {
      '1-30': 18000,
      '31-60': 10000,
      '61-90': 0,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-035', date: '2024-05-10', amount: 13000 },
      { id: 'INV-036', date: '2024-05-25', amount: 15000 },
    ],
    statementOfAccount: [
      { date: '2024-05-10', reference: 'Product Purchase', invoiceNo: 'INV-035', debitAmount: 13000, creditAmount: 0, balance: 13000, dueDate: '2024-06-10', status: 'Outstanding' },
      { date: '2024-05-25', reference: 'Product Purchase', invoiceNo: 'INV-036', debitAmount: 15000, creditAmount: 0, balance: 28000, dueDate: '2024-06-25', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "email",
      preferredDeliveryTime: "Morning",
      specialInstructions: "Deliver to kitchen entrance"
    },
    leadStatus: "Closed Won",
    followUpDate: "2024-06-20",
    creditTerms: "Net 30",
    nextDueDate: "2024-06-10",
    creditStatus: "Good"
  },
  {
    id: 24,
    name: "Candlenut",
    type: CustomerType.Restaurant,
    address: "17A Dempsey Road, Singapore 249676",
    billingEntity: "Candlenut Trading Pte Ltd",
    payer: "Malcolm Lee",
    salesman: "salesman2",
    creditLimit: 25000,
    outstandingBalance: 18000,
    uenNo: "201312456M",
    phoneNumber: "+65 1800 304 2288",
    email: "info@candlenut.com.sg",
    agingBuckets: {
      '1-30': 12000,
      '31-60': 6000,
      '61-90': 0,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-037', date: '2024-05-12', amount: 8000 },
      { id: 'INV-038', date: '2024-05-27', amount: 10000 },
    ],
    statementOfAccount: [
      { date: '2024-05-12', reference: 'Product Purchase', invoiceNo: 'INV-037', debitAmount: 8000, creditAmount: 0, balance: 8000, dueDate: '2024-06-12', status: 'Outstanding' },
      { date: '2024-05-27', reference: 'Product Purchase', invoiceNo: 'INV-038', debitAmount: 10000, creditAmount: 0, balance: 18000, dueDate: '2024-06-27', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "phone",
      preferredDeliveryTime: "Afternoon",
      specialInstructions: "Please handle spices with care"
    },
    leadStatus: "Qualified",
    followUpDate: "2024-06-18",
    creditTerms: "Net 15",
    nextDueDate: "2024-06-12",
    creditStatus: "Warning"
  },
  {
    id: 25,
    name: "Zén",
    type: CustomerType.Restaurant,
    address: "41 Bukit Pasoh Road, Singapore 089855",
    billingEntity: "Zén Restaurant Pte Ltd",
    payer: "Björn Frantzén",
    salesman: "salesman1",
    creditLimit: 35000,
    outstandingBalance: 25000,
    uenNo: "201812345K",
    phoneNumber: "+65 6534 8880",
    email: "reservations@restaurantzen.com",
    agingBuckets: {
      '1-30': 15000,
      '31-60': 10000,
      '61-90': 0,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-039', date: '2024-05-18', amount: 12000 },
      { id: 'INV-040', date: '2024-05-30', amount: 13000 },
    ],
    statementOfAccount: [
      { date: '2024-05-18', reference: 'Product Purchase', invoiceNo: 'INV-039', debitAmount: 12000, creditAmount: 0, balance: 12000, dueDate: '2024-06-18', status: 'Outstanding' },
      { date: '2024-05-30', reference: 'Product Purchase', invoiceNo: 'INV-040', debitAmount: 13000, creditAmount: 0, balance: 25000, dueDate: '2024-06-30', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "email",
      preferredDeliveryTime: "Morning",
      specialInstructions: "Notify sommelier upon delivery"
    },
    leadStatus: "Negotiation",
    followUpDate: "2024-06-25",
    creditTerms: "Net 30",
    nextDueDate: "2024-06-18",
    creditStatus: "Good"
  },
  // Adding 5 more customers based on Restaurants and Hotels in Singapore
  {
    id: 26,
    name: "The Fullerton Hotel Singapore",
    type: CustomerType.Hotel,
    address: "1 Fullerton Square, Singapore 049178",
    billingEntity: "The Fullerton Hotel Pte Ltd",
    payer: "Cavaliere Giovanni Viterale",
    salesman: "salesman3",
    creditLimit: 60000,
    outstandingBalance: 40000,
    uenNo: "199702243N",
    phoneNumber: "+65 6733 8388",
    email: "enquiries@fullertonhotels.com",
    agingBuckets: {
      '1-30': 20000,
      '31-60': 20000,
      '61-90': 0,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-041', date: '2024-05-03', amount: 20000 },
      { id: 'INV-042', date: '2024-05-28', amount: 20000 },
    ],
    statementOfAccount: [
      { date: '2024-05-03', reference: 'Product Purchase', invoiceNo: 'INV-041', debitAmount: 20000, creditAmount: 0, balance: 20000, dueDate: '2024-06-03', status: 'Outstanding' },
      { date: '2024-05-28', reference: 'Product Purchase', invoiceNo: 'INV-042', debitAmount: 20000, creditAmount: 0, balance: 40000, dueDate: '2024-06-28', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "email",
      preferredDeliveryTime: "Morning",
      specialInstructions: "Deliver to main loading bay"
    },
    leadStatus: "Qualified",
    followUpDate: "2024-06-20",
    creditTerms: "Net 30",
    nextDueDate: "2024-06-03",
    creditStatus: "Good"
  },
  {
    id: 27,
    name: "Raffles Hotel",
    type: CustomerType.Hotel,
    address: "1 Beach Road, Singapore 189673",
    billingEntity: "Raffles Hotel Singapore Pte Ltd",
    payer: "Christian Westbeld",
    salesman: "salesman2",
    creditLimit: 70000,
    outstandingBalance: 50000,
    uenNo: "201303442G",
    phoneNumber: "+65 6337 1886",
    email: "bookus@raffles.com",
    agingBuckets: {
      '1-30': 30000,
      '31-60': 20000,
      '61-90': 0,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-043', date: '2024-05-08', amount: 30000 },
      { id: 'INV-044', date: '2024-05-29', amount: 20000 },
    ],
    statementOfAccount: [
      { date: '2024-05-08', reference: 'Product Purchase', invoiceNo: 'INV-043', debitAmount: 30000, creditAmount: 0, balance: 30000, dueDate: '2024-06-08', status: 'Outstanding' },
      { date: '2024-05-29', reference: 'Product Purchase', invoiceNo: 'INV-044', debitAmount: 20000, creditAmount: 0, balance: 50000, dueDate: '2024-06-29', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "phone",
      preferredDeliveryTime: "Afternoon",
      specialInstructions: "Call concierge upon arrival"
    },
    leadStatus: "Negotiation",
    followUpDate: "2024-06-15",
    creditTerms: "Net 30",
    nextDueDate: "2024-06-08",
    creditStatus: "Warning"
  },
  {
    id: 28,
    name: "Atlas Bar",
    type: CustomerType.Restaurant,
    address: "600 North Bridge Road, Parkview Square, Singapore 188778",
    billingEntity: "Atlas Bar Pte Ltd",
    payer: "Jesse Vida",
    salesman: "salesman1",
    creditLimit: 45000,
    outstandingBalance: 30000,
    uenNo: "201509876Z",
    phoneNumber: "+65 6396 4466",
    email: "reservations@atlasbar.sg",
    agingBuckets: {
      '1-30': 15000,
      '31-60': 15000,
      '61-90': 0,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-045', date: '2024-05-11', amount: 15000 },
      { id: 'INV-046', date: '2024-05-31', amount: 15000 },
    ],
    statementOfAccount: [
      { date: '2024-05-11', reference: 'Product Purchase', invoiceNo: 'INV-045', debitAmount: 15000, creditAmount: 0, balance: 15000, dueDate: '2024-06-11', status: 'Outstanding' },
      { date: '2024-05-31', reference: 'Product Purchase', invoiceNo: 'INV-046', debitAmount: 15000, creditAmount: 0, balance: 30000, dueDate: '2024-06-30', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "email",
      preferredDeliveryTime: "Morning",
      specialInstructions: "Deliver to bar entrance"
    },
    leadStatus: "Closed Won",
    followUpDate: "2024-06-30",
    creditTerms: "Net 30",
    nextDueDate: "2024-06-11",
    creditStatus: "Good"
  },
  {
    id: 29,
    name: "Mandarin Oriental Singapore",
    type: CustomerType.Hotel,
    address: "5 Raffles Ave, Marina Square, Singapore 039797",
    billingEntity: "Mandarin Oriental Hotel Group",
    payer: "Judy Hou",
    salesman: "salesman3",
    creditLimit: 50000,
    outstandingBalance: 35000,
    uenNo: "199401234E",
    phoneNumber: "+65 6338 0066",
    email: "reservations@mandarinoriental.com",
    agingBuckets: {
      '1-30': 20000,
      '31-60': 15000,
      '61-90': 0,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-047', date: '2024-05-15', amount: 20000 },
      { id: 'INV-048', date: '2024-05-25', amount: 15000 },
    ],
    statementOfAccount: [
      { date: '2024-05-15', reference: 'Product Purchase', invoiceNo: 'INV-047', debitAmount: 20000, creditAmount: 0, balance: 20000, dueDate: '2024-06-15', status: 'Outstanding' },
      { date: '2024-05-25', reference: 'Product Purchase', invoiceNo: 'INV-048', debitAmount: 15000, creditAmount: 0, balance: 35000, dueDate: '2024-06-25', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "phone",
      preferredDeliveryTime: "Afternoon",
      specialInstructions: "Notify manager before delivery"
    },
    leadStatus: "Qualified",
    followUpDate: "2024-06-25",
    creditTerms: "Net 30",
    nextDueDate: "2024-06-15",
    creditStatus: "Good"
  },
  {
    id: 30,
    name: "Marina Bay Sands",
    type: CustomerType.Hotel,
    address: "10 Bayfront Avenue, Singapore 018956",
    billingEntity: "Marina Bay Sands Pte Ltd",
    payer: "George Tanasijevich",
    salesman: "salesman2",
    creditLimit: 100000,
    outstandingBalance: 75000,
    uenNo: "200504364E",
    phoneNumber: "+65 6688 8888",
    email: "enquiries@marinabaysands.com",
    agingBuckets: {
      '1-30': 50000,
      '31-60': 25000,
      '61-90': 0,
      '91-120': 0,
      '120+': 0
    },
    recentInvoices: [
      { id: 'INV-049', date: '2024-05-17', amount: 50000 },
      { id: 'INV-050', date: '2024-05-27', amount: 25000 },
    ],
    statementOfAccount: [
      { date: '2024-05-17', reference: 'Product Purchase', invoiceNo: 'INV-049', debitAmount: 50000, creditAmount: 0, balance: 50000, dueDate: '2024-06-17', status: 'Outstanding' },
      { date: '2024-05-27', reference: 'Product Purchase', invoiceNo: 'INV-050', debitAmount: 25000, creditAmount: 0, balance: 75000, dueDate: '2024-06-27', status: 'Outstanding' },
    ],
    preferences: {
      preferredContactMethod: "email",
      preferredDeliveryTime: "Morning",
      specialInstructions: "Deliver to service dock"
    },
    leadStatus: "Negotiation",
    followUpDate: "2024-06-30",
    creditTerms: "Net 30",
    nextDueDate: "2024-06-17",
    creditStatus: "Warning"
  }
];