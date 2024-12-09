import { SendHorizonal } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslationContext } from '../../common/translationContext/translationContext';
import {invalidToastMessages,validToastMessages} from '../../common/toast/toastMessages'

const EmailComponent = ({
    isUserLoggedIn,
    setToastMessage,
    setToastVisible,
    setIstoastValidtype,
    setIsLoading
  }) => {

    const { t } = useTranslationContext();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [charCount, setCharCount] = useState(0);      
        
    const checkValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
    };
        
    const checkValidMessageBody = (message) => {
        const messageRegex = /^[a-zA-Z0-9\s.!?]*$/;
            return messageRegex.test(message);
    };
        
    const sendMessageToServer = (email,message) => {
      // Send message from here to server and wait till we get response.
      return new Promise((resolve, reject) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          resolve(true); 
        }, 3000); 
      });
    }
        
    const toastHandle = () => {
        if (!isUserLoggedIn) {
            if (!email) {
                setToastMessage(invalidToastMessages.emptyEmail);
                setToastVisible(true);
                setTimeout(() => {
                    setToastVisible(false);
                }, 3000);
                setIstoastValidtype(false);
                return false;  // Add early return
            }
            if (!checkValidEmail(email)) {
                setToastMessage(invalidToastMessages.invalidEmail);
                setToastVisible(true);
                setTimeout(() => {
                  setToastVisible(false);
                }, 3000);
                setIstoastValidtype(false);
                return false;  // Add early return
            }
        }
          
        if (!message) {
              setToastMessage(invalidToastMessages.emptyMessage);
              setToastVisible(true);
              setTimeout(() => {
                setToastVisible(false);
              }, 3000);
              setIstoastValidtype(false);
              return false;  // Add early return
        }
          
        if (!checkValidMessageBody(message)) {
              setToastMessage(invalidToastMessages.invalidMessageBody);
              setToastVisible(true);
              setTimeout(() => {
                setToastVisible(false);
              }, 3000);
              setIstoastValidtype(false);
              return false;  // Add early return
        }
          
        return true;  // Indicate success when no issues
    }
          
    const handleSend = async () => {
          
        console.log("Email:", email);
        console.log("Message:", message);
          
        const isValid = toastHandle();  // Now stores the return value of toastHandle
          
        if (!isValid) {
            return;  // Stop if validation fails
        }
          
        if (await sendMessageToServer(email, message)) {
            setToastMessage(validToastMessages.messageSent);
            setIstoastValidtype(true);
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
            }, 3000);
            setEmail('');
            setMessage('');
            setCharCount(0);
            return;
        } else {
            setToastMessage(invalidToastMessages.serverIssue);
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
            }, 3000);
            setIstoastValidtype(false);
        }
    };

  return (
    <div className="bg-white shadow-lg shadow-black border border-red-500 p-4 rounded-lg space-y-4">
        {!isUserLoggedIn &&
          <div className="flex flex-col">
            <label htmlFor="email" className="text-black font-medium mb-1">{t('email')}</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-red-500 rounded-lg p-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        }

        <div className="flex items-center gap-4">
          <div className="flex-1 flex flex-col">
            <label htmlFor="message" className="text-black font-medium mb-1">{t('message')}</label>
            <textarea
              id="message"
              placeholder="Type your message..."
              maxLength="500"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setCharCount(e.target.value.length);
              }}
              className="border border-red-500 rounded-lg p-2 h-32 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="text-sm text-gray-500 text-right mt-1">{charCount+t('500CharCount')}</div>
          </div>
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 focus:outline-none border-2 border-black"
          >
            <SendHorizonal />
          </button>
        </div>
      </div>
  )
}

export default EmailComponent;