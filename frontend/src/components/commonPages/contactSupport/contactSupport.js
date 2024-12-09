import React, { useEffect, useState } from 'react';
import {ChevronDown, ChevronUp } from 'lucide-react'; // Lucide Icons for FAQ dropdowns
import ToastComponent from '../../common/toast/toastComponent';
import EmailComponent from './emailComponent';
import FaqsComponent from './faqsComponent';

import { useTranslationContext } from '../../common/translationContext/translationContext';
import Loading from '../../common/loading/loading';
import {motion} from "framer-motion";

const ContactSupport = () => {

  const { t } = useTranslationContext();

  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);
  const [userRole,setUserrole] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [istoastValidtype,setIstoastValidtype] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUserLoginStatus = () => {
    // write logic to get user login status
    return false;
  }

  const getUserRole = () => {
    return 1;
  }

  useEffect(()=>{
    const isUserLoggedIn = getUserLoginStatus();
    const userRole = getUserRole();
    setIsUserLoggedIn(isUserLoggedIn);
    setUserrole(userRole);
  },[])

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);
  

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="font-cursive"
    >
    <div className="p-6 max-w-4xl mx-auto font-cursive">
      {isLoading && <Loading/>}
      {/* Toast Notification */}
      <ToastComponent toastMessage={toastMessage} toastVisible={toastVisible} istoastValidtype={istoastValidtype}/>

      {/* Title Section */}
      <h2 className="text-2xl font-bold text-black mb-6">{t('needHelp')}</h2>

      {/* Input Card */}
      <EmailComponent
        isUserLoggedIn={isUserLoggedIn}
        setToastMessage={setToastMessage}
        setToastVisible={setToastVisible}
        setIstoastValidtype={setIstoastValidtype}
        setIsLoading={setIsLoading}
      />

      {/* FAQs Section */}
      <FaqsComponent
        isUserLoggedIn={isUserLoggedIn}
        userRole={userRole}
      />
      
    </div>
    </motion.div>
  );
};

export default ContactSupport;
