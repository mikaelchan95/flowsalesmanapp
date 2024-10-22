import React from 'react';
import { DashboardItem } from '../types';

interface PerformanceMetricsProps {
  metrics: DashboardItem[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  return (
    <div className="card p-4">
      <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics && metrics.map((metric, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-lg font-semibold">{metric.value}</p>
              </div>
              {metric.icon && <metric.icon size={24} className="text-black" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;