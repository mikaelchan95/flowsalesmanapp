import React from 'react';
import { DashboardCardProps } from '../types';

const DashboardCard: React.FC<DashboardCardProps> = ({ item, className }) => {
  if (!item) return null;

  const Icon = item.icon;
  return (
    <div className={`card ${className}`}>
      <div className="card-body flex items-center justify-between h-full">
        <div>
          <p className="text-sm text-gray-500">{item.title}</p>
          <p className="text-2xl font-semibold mt-1">{item.value}</p>
        </div>
        <div className={`bg-black p-3 rounded-full`}>
          {Icon && <Icon size={24} className="text-white" />}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;