import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ShoppingCart, Users, Package, LogOut, Truck, User, ChevronDown } from 'lucide-react';
import SalesmanProfile from './SalesmanProfile';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const currentUser = localStorage.getItem('currentUser') || '';
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home size={24} className="text-white" />
            <span className="font-bold text-xl text-white">FLOW Salesman</span>
          </Link>
          <div className="flex items-center space-x-6">
            <NavLink to="/new-sales-order" icon={<ShoppingCart size={20} />} text={t('common.newOrder')} />
            <NavLink to="/customers" icon={<Users size={20} />} text={t('common.customers')} />
            <NavLink to="/product-catalog" icon={<Package size={20} />} text={t('common.products')} />
            <NavLink to="/order-tracking" icon={<Truck size={20} />} text={t('common.orderTracking')} />
            <LanguageSwitcher />
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-1 hover:text-gray-300 transition duration-150 ease-in-out"
              >
                <User size={20} className="text-white" />
                <span className="hidden md:inline text-white">{t('common.hi', { name: getFirstName(currentUser) })}</span>
                <ChevronDown size={16} className="text-white" />
              </button>
              {showProfileMenu && <SalesmanProfile onLogout={handleLogout} />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 hover:text-gray-300 transition duration-150 ease-in-out ${
        isActive ? 'text-white font-semibold' : 'text-gray-300'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{text}</span>
    </Link>
  );
};

export default Navbar;