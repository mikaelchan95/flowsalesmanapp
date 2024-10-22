import { useState } from 'react';

interface Profile {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  username: string;
  password: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>({
    name: 'Jim',
    email: 'jim.chan@epicowine.com',
    phone: '+65 9798 8533',
    company: 'Epico Wine & Spirits Pte Ltd',
    address: '2 Sims Cl, Singapore 387298',
    username: 'salesman1',
    password: 'salesman1',
  });

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return { profile, updateProfile };
};