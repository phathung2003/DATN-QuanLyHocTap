'use client';

import { useState } from 'react';
import Image from 'next/image';

const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Xin chào, tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      time: '22:59',
    },
    {
      text: 'Tôi cần trợ giúp với dự án của tôi.',
      sender: 'user',
      time: '23:00',
    },
    {
      text: 'Chắc chắn rồi! Bạn có thể cho tôi biết thêm chi tiết không?',
      sender: 'bot',
      time: '23:01',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setMessages([...messages, { text: newMessage, sender: 'user', time }]);
      setNewMessage('');
    }
  };

  return (
    <div>
      {/* icon để nhấn vào */}
      <div
        className="z-500 fixed bottom-5 right-5 animate-bounce cursor-pointer rounded-full bg-rose-600 p-3 shadow-xl hover:bg-rose-800"
        onClick={toggleChat}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-5 z-999 min-h-[450px] w-80 rounded-xl border border-slate-50 bg-slate-100 shadow-lg  dark:border-slate-800 dark:bg-slate-800">
          {/* Thanh tiêu đề */}
          <div className="mb-4 flex items-center justify-between rounded-t-xl bg-rose-600 p-4 text-white">
            <div className="flex items-center">
              <img
                src="/images/logo/reallogo.png"
                alt="Chat Icon"
                className="mr-2 h-6 w-6"
              />
              <h2 className="text-md font-extrabold">Chat cùng HungThanh</h2>
            </div>
            <button
              onClick={toggleChat}
              className="hover:text-gray-300 text-white"
            >
              &minus;
            </button>
          </div>

          {/* Nội dung chat */}
          <div className="flex min-h-[350px] flex-col gap-2.5 overflow-auto p-4">
            <div className="mx-auto flex flex-col items-center">
              <Image
                src="/images/logo/reallogo.png"
                width={80}
                height={80}
                alt="Picture of the author"
              />
              <h1 className="my-2 text-center text-sm font-normal text-slate-500 dark:text-slate-400">
                Chào Bạn, mình là HungThanh. Rất vui được hỗ trợ Bạn.
              </h1>
            </div>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end`}
              >
                {message.sender === 'bot' && (
                  <img
                    src="/images/logo/reallogo.png"
                    alt="Bot Icon"
                    className="mr-2 h-6 w-6 rounded-full"
                  />
                )}
                <div
                  className={`p-2 ${message.sender === 'bot' ? 'bg-white dark:bg-slate-900' : 'bg-rose-500 text-white'} max-w-xs rounded-lg text-sm`}
                >
                  {message.text}
                  <div className="text-gray-400 mt-1 text-right text-xs">
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nhập tin nhắn */}
          <div className="border-t border-slate-100 bg-white dark:border-slate-900 dark:bg-slate-900">
            <div className="flex items-center p-4">
              <input
                type="text"
                placeholder="Bạn cần hỗ trợ gì ..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full rounded-lg border-none p-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-slate-800"
              />
              <button className="text-gray-500 hover:text-gray-700 ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16v16H4z"></path>
                  <path d="M12 4v16"></path>
                  <path d="M4 12h16"></path>
                </svg>
              </button>
              <button
                onClick={handleSendMessage}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2L15 22 11 13 2 9l20-7z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatIcon;
