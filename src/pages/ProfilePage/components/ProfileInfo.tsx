import React, { useState } from 'react';
import { User, Mail, Phone, Building, MapPin, Edit2, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProfileField from './ProfileField';
import { useProfile } from '../hooks/useProfile';
import { validateForm } from '../utils/validation';

const ProfileInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, updateProfile } = useProfile();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateProfile({ [name]: value });
  };

  const handleSave = () => {
    const error = validateForm(profile);
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
    <>
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
    </>
  );
};

export default ProfileInfo;