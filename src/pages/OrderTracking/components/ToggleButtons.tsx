import React from 'react';

interface ToggleButtonsProps {
  showQuotations: boolean;
  setShowQuotations: (show: boolean) => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ showQuotations, setShowQuotations }) => {
  return (
    <div className="flex space-x-2 mt-4 md:mt-0">
      <button
        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
          !showQuotations
            ? 'bg-black text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => setShowQuotations(false)}
      >
        Orders
      </button>
      <button
        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
          showQuotations
            ? 'bg-black text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        onClick={() => setShowQuotations(true)}
      >
        Quotations
      </button>
    </div>
  );
};

export default ToggleButtons;