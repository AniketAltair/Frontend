import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Chat = ({ isVisible }) => {
  const [messages, setMessages] = useState([{ type: 'assistant', text: 'How can I help you ?' }]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      type: 'user',
      text: inputValue,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage, { type: 'assistant', text: 'Fetching...' }]);
    setInputValue('');
    setLoading(true); // Start loading when the user sends a message

    // API to fetch , and once we have response, set it here.
    // No timeout but actual api call
    setTimeout(() => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages.pop(); // Remove "Fetching..."
        updatedMessages.push({
          type: 'assistant',
          text: 'Here is the response!', // Replace with actual response text
        });
        return updatedMessages;
      });
      setLoading(false); // Stop loading when the response is received
    }, 2000);
  };

  return (
    <div
      className={`fixed bottom-[100px] right-[20px] w-80 bg-white border-2 border-red-500 shadow-lg rounded-lg z-50 transition-all duration-1000 ease-in-out ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[400px] opacity-0'
      }`}
    >
      {/* Chat Messages */}
      <div
        className="p-4 max-h-64 overflow-y-auto"
        style={{
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For Internet Explorer and Edge
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[80%] break-words mb-2 p-2 rounded-lg text-sm text-black ${
              message.type === 'user'
                ? 'bg-red-200 text-left mr-auto'
                : 'bg-green-200 text-right ml-auto'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      {/* Input Box */}
      <div className="p-2 border-t border-red-500 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question ..."
          className="flex-1 p-2 text-black border-2 border-red-500 rounded-lg focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={loading}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;
