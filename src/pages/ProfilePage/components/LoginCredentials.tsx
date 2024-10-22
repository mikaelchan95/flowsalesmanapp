import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import ProfileField from './ProfileField';
import { useProfile } from '../hooks/useProfile';

const LoginCredentials: React.FC = () => {
  const [showCredentials, setShowCredentials] = useState(false);
  const { profile } = useProfile();

  return (
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
  );
};

export default LoginCredentials;