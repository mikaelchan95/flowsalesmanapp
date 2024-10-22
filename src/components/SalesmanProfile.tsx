import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';

interface SalesmanProfileProps {
  onLogout: () => void;
}

const SalesmanProfile: React.FC<SalesmanProfileProps> = ({ onLogout }) => {
  const { t } = useTranslation();
  const currentUser = localStorage.getItem('currentUser') || '';

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
      <div className="px-4 py-2 bg-gray-100">
        <p className="text-sm font-medium text-gray-800">{currentUser}</p>
        <p className="text-xs text-gray-600">Epico Wine & Spirits Pte Ltd</p>
      </div>
      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
        <User size={16} className="mr-2" />
        {t('common.profile')}
      </Link>
      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
        <Settings size={16} className="mr-2" />
        {t('common.settings')}
      </Link>
      <Link to="/help-support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
        <HelpCircle size={16} className="mr-2" />
        {t('common.helpSupport')}
      </Link>
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
      >
        <LogOut size={16} className="mr-2" />
        {t('common.logout')}
      </button>
    </div>
  );
};

export default SalesmanProfile;