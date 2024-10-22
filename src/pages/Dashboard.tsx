import React from 'react';
import { ShoppingCart, Users, Package, DollarSign, TrendingUp, Zap, Coffee, Briefcase, Globe, Heart } from 'lucide-react';

const getDummyDataForSalesman = (salesman: string) => [
  { title: 'Total Sales', value: salesman === 'salesman1' ? '$124,567' : '$98,765', icon: DollarSign, color: 'bg-green-500' },
  { title: 'New Customers', value: salesman === 'salesman1' ? '87' : '62', icon: Users, color: 'bg-blue-500' },
  { title: 'Products Sold', value: salesman === 'salesman1' ? '1,234' : '987', icon: Package, color: 'bg-purple-500' },
  { title: 'Avg. Order Value', value: salesman === 'salesman1' ? '$456' : '$398', icon: ShoppingCart, color: 'bg-yellow-500' },
  { title: 'Revenue Growth', value: salesman === 'salesman1' ? '+15%' : '+12%', icon: TrendingUp, color: 'bg-red-500' },
  { title: 'Active Users', value: salesman === 'salesman1' ? '543' : '421', icon: Zap, color: 'bg-indigo-500' },
  { title: 'Subscriptions', value: salesman === 'salesman1' ? '210' : '175', icon: Coffee, color: 'bg-pink-500' },
  { title: 'Business Leads', value: salesman === 'salesman1' ? '45' : '38', icon: Briefcase, color: 'bg-teal-500' },
  { title: 'Global Reach', value: salesman === 'salesman1' ? '28 countries' : '22 countries', icon: Globe, color: 'bg-orange-500' },
  { title: 'Customer Satisfaction', value: salesman === 'salesman1' ? '4.8/5' : '4.7/5', icon: Heart, color: 'bg-cyan-500' },
];

const Dashboard: React.FC = () => {
  const currentUser = localStorage.getItem('currentUser') || '';
  const dummyData = getDummyDataForSalesman(currentUser);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <DashboardCard item={dummyData[0]} className="md:col-span-2 lg:col-span-2 lg:row-span-2" />
        <DashboardCard item={dummyData[1]} />
        <DashboardCard item={dummyData[2]} />
        <DashboardCard item={dummyData[3]} className="md:col-span-2 lg:col-span-1" />
        <DashboardCard item={dummyData[4]} />
        <DashboardCard item={dummyData[5]} />
        <DashboardCard item={dummyData[6]} className="md:col-span-3 lg:col-span-2" />
        <DashboardCard item={dummyData[7]} />
        <DashboardCard item={dummyData[8]} />
        <DashboardCard item={dummyData[9]} className="md:col-span-3 lg:col-span-4" />
      </div>
    </div>
  );
};

interface DashboardCardProps {
  item: {
    title: string;
    value: string;
    icon: React.ElementType;
    color: string;
  };
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ item, className }) => {
  const Icon = item.icon;
  return (
    <div className={`card ${className}`}>
      <div className="card-body flex items-center justify-between h-full">
        <div>
          <p className="text-sm text-gray-500">{item.title}</p>
          <p className="text-2xl font-semibold mt-1">{item.value}</p>
        </div>
        <div className={`${item.color} p-3 rounded-full`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;