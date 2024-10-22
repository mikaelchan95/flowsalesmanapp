import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Customer } from '../../data/types';
import { dummyCustomers } from '../../data/dummyCustomers';
import CustomerTable from './components/CustomerTable';
import SearchBar from './components/SearchBar';
import AddCustomerButton from './components/AddCustomerButton';
import AddCustomerModal from './components/AddCustomerModal';
import CustomerStats from './components/CustomerStats';
import CustomerTypeDistribution from './components/CustomerTypeDistribution';
import RecentCustomers from './components/RecentCustomers';
import TopCustomers from './components/TopCustomers';
import CustomerGrowth from './components/CustomerGrowth';
import { toast } from 'react-hot-toast';
import { Download, Upload, FileText, UserPlus } from 'lucide-react';
import { exportToCSV, importFromCSV } from './utils/csvUtils';

const CustomerDatabase: React.FC = () => {
  const { t } = useTranslation();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const currentUser = localStorage.getItem('currentUser') || '';

  useEffect(() => {
    const fetchedCustomers = dummyCustomers.filter(customer => customer.salesman === currentUser);
    setCustomers(fetchedCustomers);
    setFilteredCustomers(fetchedCustomers);
  }, [currentUser]);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.uenNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customers, searchTerm]);

  const handleAddCustomer = (newCustomer: Customer) => {
    const customerWithId = { ...newCustomer, id: customers.length + 1 };
    setCustomers(prevCustomers => [...prevCustomers, customerWithId]);
    setFilteredCustomers(prevFiltered => [...prevFiltered, customerWithId]);
    setShowAddModal(false);
    toast.success(t('customers.customerAddedSuccess'));
  };

  const handleExportCSV = () => {
    exportToCSV(customers);
    toast.success(t('customers.exportSuccess'));
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importFromCSV(file, (importedCustomers) => {
        setCustomers(prevCustomers => [...prevCustomers, ...importedCustomers]);
        setFilteredCustomers(prevFiltered => [...prevFiltered, ...importedCustomers]);
        toast.success(t('customers.importSuccess', { count: importedCustomers.length }));
      });
    }
  };

  const handleDownloadTemplate = () => {
    const templateContent = "name,type,address,billingEntity,payer,creditLimit,outstandingBalance,uenNo,phoneNumber,email\n";
    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "customer_template.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    toast.success(t('customers.templateDownloadSuccess'));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('customers.title')}</h1>
      
      <div className="flex flex-wrap justify-between items-center mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex flex-wrap justify-end space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200 flex items-center"
          >
            <UserPlus size={20} className="mr-2" />
            {t('customers.addCustomer')}
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 flex items-center"
          >
            <Download size={20} className="mr-2" />
            {t('customers.exportCSV')}
          </button>
          <label className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 flex items-center cursor-pointer">
            <Upload size={20} className="mr-2" />
            {t('customers.importCSV')}
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
          </label>
          <button
            onClick={handleDownloadTemplate}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-200 flex items-center"
          >
            <FileText size={20} className="mr-2" />
            {t('customers.downloadTemplate')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <CustomerStats customers={customers} />
        <CustomerTypeDistribution customers={customers} />
        <RecentCustomers customers={customers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TopCustomers customers={customers} />
        <CustomerGrowth customers={customers} />
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <CustomerTable customers={filteredCustomers} />
      </div>
      
      {showAddModal && (
        <AddCustomerModal onSubmit={handleAddCustomer} onCancel={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default CustomerDatabase;