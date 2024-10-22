import React from 'react';
import { Upload, Download } from 'lucide-react';

const ProductImportExport: React.FC = () => {
  const handleImport = () => {
    // Implement import logic
    console.log('Importing products...');
  };

  const handleExport = () => {
    // Implement export logic
    console.log('Exporting products...');
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleImport}
        className="flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-200"
      >
        <Upload size={20} className="mr-2" />
        Import Products
      </button>
      <button
        onClick={handleExport}
        className="flex items-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-200"
      >
        <Download size={20} className="mr-2" />
        Export Products
      </button>
    </div>
  );
};

export default ProductImportExport;