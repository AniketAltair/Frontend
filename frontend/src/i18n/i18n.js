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
        "whoAreWe": "Who are we?",
        "whoAreYou": "Who are you?",
        "objectives": "What are we trying to acheive?",
        "ourAcheivements": "Our Acheivements?",
        "aboutTheFounder": "About the Founder",
        "needHelp":"Need Help?",
        "email":"Email :",
        "message":"Message :",
        "500CharCount":"/500",
        "faqs":"FAQs",
        "save":"Save",
        "notification":"Notification",
        "volume":"Volume",
        "messages":"Messages",
        "noAvailableData":"No available data"
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
