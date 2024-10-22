import React from 'react';

interface ProfileFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  name: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ icon, label, value, name, isEditing, onChange, type = "text" }) => (
  <div className="flex items-center">
    <div className="w-8 mr-4 text-gray-500">{icon}</div>
    <div className="flex-grow">
      <p className="text-sm text-gray-600">{label}</p>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded mt-1"
        />
      ) : (
        <p className="font-medium">{type === "password" ? "••••••••" : value}</p>
      )}
    </div>
  </div>
);

export default ProfileField;