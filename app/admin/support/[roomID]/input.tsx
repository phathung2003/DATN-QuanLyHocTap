'use client';
import React, { useState } from 'react';
import { AddMessage } from '@/backend/feature/chat';

interface IMessage {
  roomID: string;
}

const MessageInput: React.FC<IMessage> = ({ roomID }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      AddMessage(roomID, message);
    }
    setMessage('');
  };

  return (
    <div className="border-gray-700 bg-gray-800 flex items-center border-t pt-3">
      <textarea
        id="text"
        className="flex-1 resize-none overflow-y-auto rounded-lg bg-slate-300 p-2 dark:bg-slate-700"
        placeholder="Nhắn tin"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Ngăn xuống dòng khi nhấn Enter
            handleSendMessage();
          }
        }}
      />

      <button
        id="submit"
        className="text-bold ml-4 rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600"
        onClick={handleSendMessage}
      >
        Gửi
      </button>
    </div>
  );
};

export default MessageInput;
