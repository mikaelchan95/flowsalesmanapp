import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        className={`px-2 py-1 rounded text-sm ${i18n.language === 'en' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`px-2 py-1 rounded text-sm ${i18n.language === 'zh' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
        onClick={() => changeLanguage('zh')}
      >
        中文
      </button>
      <button
        className={`px-2 py-1 rounded text-sm ${i18n.language === 'ko' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
        onClick={() => changeLanguage('ko')}
      >
        한국어
      </button>
    </div>
  );
};

export default LanguageSwitcher;