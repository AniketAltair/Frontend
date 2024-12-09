import React, { useEffect, useState } from 'react';
import NotificationSettings from './notificationSettings';
import VolumeSettings from './volumeSettings';
import Loading from '../../common/loading/loading';
import ToastComponent from '../../common/toast/toastComponent';
import {validToastMessages,invalidToastMessages} from '../../common/toast/toastMessages'
import { useTranslationContext } from '../../common/translationContext/translationContext';
import {motion} from "framer-motion";

const Settings = () => {

  const { t } = useTranslationContext();

  const [notificationSettingsData,setNotificationSettingsData] = useState({
    inApp:true,
    push:true,
    email:true,
    whatsapp:true,
  });
  const [volumeSettingsData,setVolumeSettingsData] = useState(50);
  const [isLoading,setIsLoading] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [istoastValidtype,setIstoastValidtype] = useState(false);

  const toastHandler = () => {
    setToastMessage(validToastMessages.dataSaved);
    setIstoastValidtype(true);
    setTimeout(()=>{

    })
  }

  const sendDataToServer = () => {
    // write logic here to send data to server.
    // we have notificationSettingsData and volumeSettingsData
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        resolve(true);  
      }, 1000); 
    });
  }

  const handleSave = async () => {

    console.log(notificationSettingsData);
    console.log(volumeSettingsData);

    if(await sendDataToServer()){
      setToastMessage(validToastMessages.dataSaved);
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      setIstoastValidtype(true);
      return false;
    }else{
      setToastMessage(invalidToastMessages.dataNotSavedServerIssue);
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      setIstoastValidtype(false);
      return false;
    }

  }

  const getUserNotificationsSettingsData = () => {
    // API call to bring notification backend data
    // remove constant data after api logic implemented
    return {
      inApp:true,
      push:false,
      email:true,
      whatsapp:false,
    }
  }

  const getUserVolumeSettingsData = () => {
    // API call to bring volume backend data
    return 90;
  }

  useEffect(()=>{

    const userNotificationsSettingsData = getUserNotificationsSettingsData();
    const userVolumeSettingsData = getUserVolumeSettingsData();

    setNotificationSettingsData(userNotificationsSettingsData);
    setVolumeSettingsData(userVolumeSettingsData);

  },[])

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <>
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="font-cursive"
    >
    <ToastComponent toastMessage={toastMessage} toastVisible={toastVisible} istoastValidtype={istoastValidtype}/>
    
    <div className="flex flex-col items-center justify-center mt-40 space-y-8 font-cursive">
      {/* Notification Settings */}
      {isLoading && <Loading/>}

      <NotificationSettings 
        notificationSettingsData={notificationSettingsData} 
        setNotificationSettingsData={setNotificationSettingsData}
      />

      {/* Volume Settings */}
      <VolumeSettings 
        volumeSettingsData={volumeSettingsData}
        setNotificationSettingsData={setVolumeSettingsData}
      />

      {/* Save Button */}
      <button 
      className="px-8 py-3 bg-white border-4 border-green-600 text-black font-bold rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:bg-green-600 hover:text-white"
      onClick={handleSave}
      >
        {t('save')}
      </button>
    </div>
    </motion.div>
    </>
  );
};

export default Settings;
