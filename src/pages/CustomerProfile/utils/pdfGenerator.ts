import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Customer, StatementEntry, Order } from '../../../data/types';
import { formatCurrency, formatDate } from '../../../utils/helpers';

export const generatePDF = (customer: Customer, transactions: StatementEntry[]) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('Statement of Account', 14, 20);

  // Add customer information
  doc.setFontSize(12);
  doc.text(`Customer: ${customer.name}`, 14, 30);
  doc.text(`Address: ${customer.address}`, 14, 36);
  doc.text(`UEN: ${customer.uenNo}`, 14, 42);

  // Add statement details
  doc.autoTable({
    head: [['Date', 'Reference', 'Invoice No', 'Debit', 'Credit', 'Balance', 'Status']],
    body: transactions.map(t => [
      formatDate(t.date),
      t.reference,
      t.invoiceNo,
      formatCurrency(t.debitAmount),
      formatCurrency(t.creditAmount),
      formatCurrency(t.balance),
      t.status
    ]),
    startY: 50,
  });

  // Save the PDF
  doc.save(`Statement_of_Account_${customer.name}.pdf`);
};

export const generateInvoicePDF = (order: Order) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('Invoice', 14, 20);

  // Add order information
  doc.setFontSize(12);
  doc.text(`Invoice Number: ${order.invoiceNumber}`, 14, 30);
  doc.text(`Customer: ${order.customerName}`, 14, 36);
  doc.text(`Order Date: ${formatDate(order.orderDate)}`, 14, 42);
  doc.text(`Status: ${order.status}`, 14, 48);

  // Add order items
  doc.autoTable({
    head: [['Product', 'Quantity', 'Price', 'Type', 'Subtotal']],
    body: order.items.map(item => [
      item.productName,
      item.quantity,
      formatCurrency(item.price),
      item.isConsignment ? 'Consignment' : item.isDutyFree ? 'Duty-Free' : 'Duty-Paid',
      formatCurrency(item.quantity * item.price)
    ]),
    startY: 55,
  });

  // Add total
  const finalY = (doc as any).lastAutoTable.finalY || 55;
  doc.text(`Subtotal: ${formatCurrency(order.subtotal)}`, 14, finalY + 10);
  doc.text(`GST (9%): ${formatCurrency(order.gst)}`, 14, finalY + 16);
  doc.text(`Total: ${formatCurrency(order.total)}`, 14, finalY + 22);

  // Save the PDF
  doc.save(`Invoice_${order.invoiceNumber}.pdf`);
};