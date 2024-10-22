import { IconProps } from 'lucide-react';

export interface DashboardItem {
  title: string;
  value: string;
  icon: React.ComponentType<IconProps>;
  color: string;
}

export interface DashboardCardProps {
  item: DashboardItem;
  className?: string;
}

export interface MonthlySales {
  month: string;
  sales: number;
}

export interface DashboardData {
  totalSales: DashboardItem;
  outstandingBalance: DashboardItem;
  totalCustomers: DashboardItem;
  averageOrderValue: DashboardItem;
  topSellingProduct: DashboardItem;
  lowStockAlert: DashboardItem;
  monthlySales: MonthlySales[];
  performanceMetrics: DashboardItem[];
}