import React, { useState } from 'react';
import { Bell, Monitor, Lock, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'en',
    twoFactorAuth: false,
    sessionTimeout: '30',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = () => {
    // In a real application, you would send this data to your backend
    console.log('Saving settings:', settings);
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <NotificationSettings settings={settings} onChange={handleInputChange} />
        <DisplaySettings settings={settings} onChange={handleInputChange} />
        <SecuritySettings settings={settings} onChange={handleInputChange} />
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            <Save size={20} className="mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

interface SettingsSectionProps {
  settings: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const NotificationSettings: React.FC<SettingsSectionProps> = ({ settings, onChange }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <Bell size={24} className="mr-2" />
      Notification Settings
    </h2>
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="emailNotifications"
          name="emailNotifications"
          checked={settings.emailNotifications}
          onChange={onChange}
          className="mr-2"
        />
        <label htmlFor="emailNotifications">Receive email notifications</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="pushNotifications"
          name="pushNotifications"
          checked={settings.pushNotifications}
          onChange={onChange}
          className="mr-2"
        />
        <label htmlFor="pushNotifications">Receive push notifications</label>
      </div>
    </div>
  </div>
);

const DisplaySettings: React.FC<SettingsSectionProps> = ({ settings, onChange }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <Monitor size={24} className="mr-2" />
      Display Settings
    </h2>
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="darkMode"
          name="darkMode"
          checked={settings.darkMode}
          onChange={onChange}
          className="mr-2"
        />
        <label htmlFor="darkMode">Enable dark mode</label>
      </div>
      <div>
        <label htmlFor="language" className="block mb-2">Language</label>
        <select
          id="language"
          name="language"
          value={settings.language}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
    </div>
  </div>
);

const SecuritySettings: React.FC<SettingsSectionProps> = ({ settings, onChange }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <Lock size={24} className="mr-2" />
      Security Settings
    </h2>
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="twoFactorAuth"
          name="twoFactorAuth"
          checked={settings.twoFactorAuth}
          onChange={onChange}
          className="mr-2"
        />
        <label htmlFor="twoFactorAuth">Enable two-factor authentication</label>
      </div>
      <div>
        <label htmlFor="sessionTimeout" className="block mb-2">Session Timeout (minutes)</label>
        <select
          id="sessionTimeout"
          name="sessionTimeout"
          value={settings.sessionTimeout}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
      </div>
    </div>
  </div>
);

export default SettingsPage;