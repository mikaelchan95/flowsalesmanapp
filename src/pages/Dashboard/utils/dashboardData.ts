import { ShoppingCart, DollarSign, Users, Package, AlertTriangle, TrendingUp, Target, Award } from 'lucide-react';
import { getCustomersForSalesman, getCustomerProfileForSalesman } from '../../../data/customers';
import { products } from '../../../data/products';
import { DashboardData } from '../types';
import { Customer, Product } from '../../../data/types';

export const getDashboardData = (salesman: string): DashboardData => {
  const customers = getCustomersForSalesman(salesman);
  const customerProfiles: Customer[] = customers
    .map(customer => getCustomerProfileForSalesman(customer.id, salesman))
    .filter((profile): profile is Customer => profile !== undefined);

  const totalSales = calculateTotalSales(customerProfiles);
  const totalOutstanding = calculateTotalOutstanding(customerProfiles);
  const totalInvoices = calculateTotalInvoices(customerProfiles);
  const averageOrderValue = calculateAverageOrderValue(totalSales, totalInvoices);
  const topSellingProduct = findTopSellingProduct(products);
  const lowStockProducts = findLowStockProducts(products);
  const monthlySales = generateMonthlySalesData();
  const performanceMetrics = generatePerformanceMetrics();

  return {
    totalSales: { 
      title: 'Total Sales', 
      value: formatCurrency(totalSales), 
      icon: DollarSign, 
      color: 'bg-green-500' 
    },
    outstandingBalance: { 
      title: 'Outstanding Balance', 
      value: formatCurrency(totalOutstanding), 
      icon: ShoppingCart, 
      color: 'bg-yellow-500' 
    },
    totalCustomers: { 
      title: 'Total Customers', 
      value: customers.length.toString(), 
      icon: Users, 
      color: 'bg-blue-500' 
    },
    averageOrderValue: { 
      title: 'Avg. Order Value', 
      value: formatCurrency(averageOrderValue), 
      icon: ShoppingCart, 
      color: 'bg-purple-500' 
    },
    topSellingProduct: { 
      title: 'Top Selling Product', 
      value: topSellingProduct.name, 
      icon: Package, 
      color: 'bg-indigo-500' 
    },
    lowStockAlert: { 
      title: 'Low Stock Alert', 
      value: `${lowStockProducts.length} products`, 
      icon: AlertTriangle, 
      color: 'bg-red-500' 
    },
    monthlySales,
    performanceMetrics,
  };
};

const calculateTotalSales = (customerProfiles: Customer[]): number => {
  return customerProfiles.reduce((sum, customer) => {
    return sum + customer.recentInvoices.reduce((invoiceSum, invoice) => invoiceSum + invoice.amount, 0);
  }, 0);
};

const calculateTotalOutstanding = (customerProfiles: Customer[]): number => {
  return customerProfiles.reduce((sum, customer) => sum + customer.outstandingBalance, 0);
};

const calculateTotalInvoices = (customerProfiles: Customer[]): number => {
  return customerProfiles.reduce((sum, customer) => sum + customer.recentInvoices.length, 0);
};

const calculateAverageOrderValue = (totalSales: number, totalInvoices: number): number => {
  return totalInvoices > 0 ? totalSales / totalInvoices : 0;
};

const findTopSellingProduct = (products: Product[]): Product => {
  return products.reduce((top, product) => {
    const currentSales = 100 - (product.dutyFreeStock + product.dutyPaidStock + product.consignmentStock);
    const topSales = 100 - (top.dutyFreeStock + top.dutyPaidStock + top.consignmentStock);
    return currentSales > topSales ? product : top;
  });
};

const findLowStockProducts = (products: Product[]): Product[] => {
  return products.filter(product => 
    (product.dutyFreeStock + product.dutyPaidStock + product.consignmentStock) < 20
  );
};

const generateMonthlySalesData = () => {
  // This is a mock function. In a real application, you would fetch this data from your backend.
  return [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
  ];
};

const generatePerformanceMetrics = () => {
  // This is a mock function. In a real application, you would calculate these metrics based on actual data.
  return [
    { title: 'Sales Growth', value: '+15%', icon: TrendingUp, color: 'bg-green-500' },
    { title: 'Conversion Rate', value: '68%', icon: Target, color: 'bg-blue-500' },
    { title: 'Customer Retention', value: '92%', icon: Users, color: 'bg-purple-500' },
    { title: 'Sales Target Achievement', value: '85%', icon: Award, color: 'bg-yellow-500' },
  ];
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};