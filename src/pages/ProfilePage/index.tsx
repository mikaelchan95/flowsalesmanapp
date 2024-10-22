import React from 'react';
import ProfileInfo from './components/ProfileInfo';
import LoginCredentials from './components/LoginCredentials';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <ProfileInfo />
        <LoginCredentials />
      </div>
    </div>
  );
};

export default ProfilePage;