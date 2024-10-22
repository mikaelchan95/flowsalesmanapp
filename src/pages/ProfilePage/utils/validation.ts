import { Profile } from '../hooks/useProfile';

export const validateForm = (profile: Profile): string | null => {
  if (!profile.name.trim()) return "Name is required";
  if (!profile.email.trim()) return "Email is required";
  if (!/^\S+@\S+\.\S+$/.test(profile.email)) return "Invalid email format";
  if (!profile.phone.trim()) return "Phone number is required";
  if (!profile.company.trim()) return "Company is required";
  if (!profile.address.trim()) return "Address is required";
  return null;
};