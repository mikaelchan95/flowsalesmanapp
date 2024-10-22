import React from 'react';
import DashboardCard from './DashboardCard';
import { DashboardData } from '../types';

interface DashboardCardsProps {
  data: DashboardData;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.totalSales && <DashboardCard item={data.totalSales} className="md:col-span-2 lg:col-span-2" />}
      {data.outstandingBalance && <DashboardCard item={data.outstandingBalance} />}
      {data.totalCustomers && <DashboardCard item={data.totalCustomers} />}
      {data.averageOrderValue && <DashboardCard item={data.averageOrderValue} className="md:col-span-2 lg:col-span-1" />}
      {data.topSellingProduct && <DashboardCard item={data.topSellingProduct} />}
      {data.lowStockAlert && <DashboardCard item={data.lowStockAlert} />}
    </div>
  );
};

export default DashboardCards;