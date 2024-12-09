import React, { useEffect, useState } from "react";
import TableComponent from "../../common/table/tableComponent";
import { useTranslationContext } from '../../common/translationContext/translationContext';
import {motion} from "framer-motion";

const Messages = () => {

  const { t } = useTranslationContext();
  const [messages,setMessages] = useState([]);
  const columns = [
    { key: "id", label: "ID", sortable: true },
    { key: "message", label: "Message", sortable: true },
    { key: "sender", label: "Sender", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "view", label: "View", sortable: false, popupField: "From" },
  ];

  // remove constant data after api logic implemented
  const messagesData = [
    { id: 1, message: "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd", sender: "Alice", date: "2024-12-01" },
    { id: 2, message: "How are you?", sender: "Bob", date: "2024-12-02" },
    { id: 3, message: "Meeting at 5 PM", sender: "Charlie", date: "2024-12-03" },
    ...Array(35)
      .fill()
      .map((_, index) => ({
        id: index + 4,
        message: `Message ${index + 4}`,
        sender: `Sender ${index + 4}`,
        date: `2024-12-${(index % 30) + 4}`,
      })),
  ];

  const getUserMessages = () =>{
    // API call to fetch user messages
    return messages;
  }

  useEffect(()=>{
    const userMessages = getUserMessages();
    setMessages(userMessages);
  },[]);

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
    <div className="min-h-screen p-5 bg-gray-50 flex items-center justify-center font-cursive">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-lg p-5 border-red-500 border-2">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          {t('messages')}
        </h2>
        <TableComponent data={messagesData} columns={columns} />
      </div>
    </div>
    </motion.div>
  );
};

export default Messages;
