// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "macroMinder":"MacroMinder",
        "signIn": "Sign In",
        "signUp": "Sign Up",
        "forgotPassword": "Forgot Password",
        "logOut": "Log Out",
      },
    },
    // Add other languages like 'fr', 'de' here
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
