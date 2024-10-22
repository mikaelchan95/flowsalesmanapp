import { useEffect, useState } from 'react';
import { getDashboardData } from '../utils/dashboardData';
import { DashboardData } from '../types';

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser') || '';
    const data = getDashboardData(currentUser);
    setDashboardData(data);
  }, []);

  return dashboardData;
};