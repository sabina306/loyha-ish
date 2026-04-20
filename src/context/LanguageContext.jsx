import React, { createContext, useContext, useState } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('phpmaster_lang') || 'uz';
    });

    const setLanguage = (newLang) => {
        setLang(newLang);
        localStorage.setItem('phpmaster_lang', newLang);
    };

    const t = (key) => {
        return translations[lang]?.[key] || translations['uz'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
