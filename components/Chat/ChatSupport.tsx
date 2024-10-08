'use client';

import { useState } from 'react';
import Image from 'next/image';

import ChatIcon from '@/public/vector/chat.svg';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Xin chào, tôi có thể giúp gì cho bạn?',
      sender: 'bot',
      time: '22:59',
      isOwnMessage: false,
    },
    {
      text: 'Tôi cần trợ giúp với dự án của tôi.',
      sender: 'user',
      time: '23:00',
      isOwnMessage: true,
    },
    {
      text: 'Chắc chắn rồi! Bạn có thể cho tôi biết thêm chi tiết không?',
      sender: 'bot',
      time: '23:01',
      isOwnMessage: false,
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
      setMessages([
        ...messages,
        { text: newMessage, sender: 'user', time, isOwnMessage: true },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div>
      {!isOpen ? (
        <div
          id="openChatIcon"
          className="z-500 fixed bottom-5 right-5 cursor-pointer rounded-full bg-rose-600 p-3 shadow-xl hover:bg-rose-800"
          onClick={toggleChat}
        >
          <ChatIcon />
        </div>
      ) : (
        <div className="fixed bottom-1 right-8 z-999 max-h-[80vh] w-80 rounded-xl border border-slate-50 bg-slate-100 shadow-lg  dark:border-slate-800 dark:bg-slate-800">
          {/* Thanh tiêu đề */}
          <div className="flex items-center justify-between rounded-t-xl bg-rose-600 p-3 text-white">
            <div className="flex items-center">
              <Image
                src="/images/logo/reallogo.png"
                alt="Chat Icon"
                width={30}
                height={30}
              />
              <h2 className="ml-2 text-lg font-bold">Hỗ trợ</h2>
            </div>
            <button
              id="minimizeChat"
              onClick={toggleChat}
              className="hover:text-gray-300 text-white"
            >
              &mdash;
            </button>
          </div>

          {/* Nội dung chat */}
          <div className="flex max-h-[50vh] flex-col gap-2.5 overflow-auto p-4">
            <div className="mx-auto flex flex-col items-center">
              <Image
                src="/images/logo/reallogo.png"
                width={50}
                height={50}
                alt="Picture of the author"
              />
              <h1 className="my-2 text-center text-sm font-normal text-slate-500 dark:text-slate-400">
                Chào bạn! Tôi có thể giúp gì cho bạn?
              </h1>
            </div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end`}
              >
                <div
                  className={`min-w-[115px] max-w-md break-words rounded-lg p-3 text-sm ${message.isOwnMessage ? ' bg-rose-500 text-white' : 'bg-white dark:bg-slate-900'}`}
                >
                  <div>{message.text}</div>
                  {message.time && (
                    <div className="text-gray-400 mt-1 text-xs">
                      {message.time}
                    </div>
                  )}
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

export default ChatSupport;
