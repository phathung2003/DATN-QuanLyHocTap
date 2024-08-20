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
    <div className="flex items-center p-5">
      <textarea
        id="text"
        className="flex-1 resize-none overflow-y-auto rounded-lg bg-slate-200 p-2 dark:bg-slate-700"
        placeholder="Nhập tin nhắn..."
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
        className="text-bold ml-4 rounded-lg bg-blue-500 p-5 text-white hover:bg-blue-600"
        onClick={handleSendMessage}
      >
        Gửi
      </button>
    </div>
  );
};

export default MessageInput;
