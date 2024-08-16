'use client';
import { useEffect, useState, useRef } from 'react';
import MessageInput from '@/app/admin/support/[roomID]/input';
import { IMessage } from '@/backend/models/data/IChat';
import { GetMessage } from '@/backend/database/chat';
import { FormatMessageTime, CheckDivider } from '@/backend/feature/chat';
interface IChatRoom {
  opponentName: string;
  roomID: string;
  userID: string;
}

const ChatContent: React.FC<IChatRoom> = ({ opponentName, roomID, userID }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<IMessage[]>([]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  useEffect(() => {
    const unsubscribe = GetMessage(userID, roomID, (message) => {
      const sortedMessages = message.sort(
        (a, b) => a.uploadTime.seconds - b.uploadTime.seconds,
      );
      setMessage(sortedMessages);
    });

    // Ngắt kết nối listener khi component bị unmount
    return () => {
      unsubscribe();
    };
  }, [userID, roomID, setMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [message]);
  return (
    <div className="bg-gray-900 flex flex-1 flex-col">
      <div className="border-gray-700 border-b pb-6 text-xl font-bold">
        {opponentName}
      </div>

      {/* Nội dung tin nhắn */}
      <div className="bg-gray-900 flex h-[60vh] flex-col space-y-3 overflow-y-auto p-4">
        {message.map((data, index) => {
          let showDivider = false;
          if (index > 0) {
            const currentMessageTime = data.uploadTime; // Chuyển đổi thành số milliseconds
            const previousMessage = message[index - 1];
            showDivider = CheckDivider(
              currentMessageTime,
              previousMessage.uploadTime,
            );
            console.log('Show Divider:', showDivider); // Kiểm tra giá trị showDivider
          } else {
            showDivider = true;
          }

          return (
            <div key={index}>
              {showDivider && (
                <div className="my-2 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    {FormatMessageTime(data.uploadTime)}
                  </span>
                </div>
              )}
              <p>{showDivider}</p>
              <div
                className={`flex ${data.isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`min-w-[115px] max-w-md break-words rounded-lg p-3 ${data.isOwnMessage ? ' bg-purple-600 text-right text-white' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div>{data.message}</div>
                  {data.uploadTime && (
                    <div className="text-gray-400 mt-1 text-xs">
                      {FormatMessageTime(data.uploadTime)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput roomID={roomID} />
    </div>
  );
};

export default ChatContent;
