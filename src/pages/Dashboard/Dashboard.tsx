import React from 'react';
import DashboardCards from './components/DashboardCards';
import SalesSummary from './components/SalesSummary';
import PerformanceMetrics from './components/PerformanceMetrics';
import TrainingSupport from './components/TrainingSupport';
import { useDashboardData } from './hooks/useDashboardData';

const Dashboard: React.FC = () => {
  const dashboardData = useDashboardData();

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <DashboardCards data={dashboardData} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <SalesSummary monthlySales={dashboardData.monthlySales} />
        <PerformanceMetrics metrics={dashboardData.performanceMetrics} />
      </div>
      <TrainingSupport />
    </div>
  );
};

export default Dashboard;