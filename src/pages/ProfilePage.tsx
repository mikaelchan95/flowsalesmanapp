import React, { useState } from 'react';
import { User, Mail, Phone, Building, MapPin, Edit2, Save, Eye, EyeOff, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Jim',
    email: 'jim.chan@epicowine.com',
    phone: '+65 9798 8533',
    company: 'Epico Wine & Spirits Pte Ltd',
    address: '2 Sims Cl, Singapore 387298',
    username: 'salesman1',
    password: 'salesman1',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!profile.name.trim()) return "Name is required";
    if (!profile.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(profile.email)) return "Invalid email format";
    if (!profile.phone.trim()) return "Phone number is required";
    if (!profile.company.trim()) return "Company is required";
    if (!profile.address.trim()) return "Address is required";
    return null;
  };

  const handleSave = () => {
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    // In a real application, you would send this data to your backend
    console.log('Saving profile:', profile);
    localStorage.setItem('currentUser', profile.name);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center text-green-600 hover:text-green-800"
            >
              <Save size={20} className="mr-1" />
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Edit2 size={20} className="mr-1" />
              Edit
            </button>
          )}
        </div>
        <div className="space-y-4">
          <ProfileField
            icon={<User size={20} />}
            label="Name"
            value={profile.name}
            name="name"
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField
            icon={<Mail size={20} />}
            label="Email"
            value={profile.email}
            name="email"
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField
            icon={<Phone size={20} />}
            label="Phone"
            value={profile.phone}
            name="phone"
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField
            icon={<Building size={20} />}
            label="Company"
            value={profile.company}
            name="company"
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField
            icon={<MapPin size={20} />}
            label="Address"
            value={profile.address}
            name="address"
            isEditing={isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Login Credentials</h3>
          <div className="flex items-center mb-4">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              {showCredentials ? (
                <>
                  <EyeOff size={20} className="mr-1" />
                  Hide Credentials
                </>
              ) : (
                <>
                  <Eye size={20} className="mr-1" />
                  Show Credentials
                </>
              )}
            </button>
          </div>
          {showCredentials && (
            <div className="space-y-4">
              <ProfileField
                icon={<User size={20} />}
                label="Username"
                value={profile.username}
                name="username"
                isEditing={false}
                onChange={() => {}}
              />
              <ProfileField
                icon={<Lock size={20} />}
                label="Password"
                value={profile.password}
                name="password"
                isEditing={false}
                onChange={() => {}}
                type="password"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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

export default ProfilePage;