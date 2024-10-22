import React from 'react';
import { UserPlus } from 'lucide-react';

interface AddCustomerButtonProps {
  onClick: () => void;
}

const AddCustomerButton: React.FC<AddCustomerButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 flex items-center"
    >
      <UserPlus size={20} className="mr-2" />
      <span>Add Customer</span>
    </button>
  );
};

export default AddCustomerButton;