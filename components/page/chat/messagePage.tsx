'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { IMessage, IUserChatInfo } from '@/backend/models/data/IChat';
import { GetMessage } from '@/backend/database/chat';
import {
  FormatMessageTime,
  FormatUserLastLoginTime,
  CheckDivider,
} from '@/backend/feature/chat';
import { DefaultUserChatValue } from '@/backend/defaultData/chat';
import { CheckUserOnlineStatus } from '@/backend/database/users';
import MessageInput from '@/components/page/chat/messageInput';

interface IChatRoom {
  opponentName: string;
  opponentID: string;
  roomID: string;
  userID: string;
}

const DefaultAvatar = '/images/users/user01.png';

const MessagePage: React.FC<IChatRoom> = ({
  opponentID,
  opponentName,
  roomID,
  userID,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<IMessage[]>([]);
  const [userInfo, setOnline] = useState<IUserChatInfo>(DefaultUserChatValue());

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  //Lấy danh sách tin nhắn
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

  //Kéo xuống dưới cùng
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  //Lấy tình trạng online
  useEffect(() => {
    const unsubscribe = CheckUserOnlineStatus(opponentID, (state) => {
      setOnline(state);
    });

    // Ngắt kết nối listener khi component bị unmount
    return () => {
      unsubscribe();
    };
  }, [opponentID, setOnline]);

  return (
    <div className="flex flex-1 flex-col rounded-md bg-slate-700 dark:bg-graydark">
      <div className="flex items-center space-x-4 rounded-md border-b border-slate-200 p-2 dark:border-slate-700">
        <div className="relative flex items-center">
          <Image
            src={DefaultAvatar}
            alt={opponentName}
            width={50}
            height={50}
            className="rounded-full"
          />
          <span
            className={`${userInfo.isOnline ? 'absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white' : ''}`}
          />
        </div>

        <div className="flex-1">
          <div className="text-xl font-bold text-white">{opponentName}</div>

          <div className=" min-h-[20px] text-sm font-normal text-slate-200 dark:text-slate-200">
            {userInfo.isOnline
              ? 'Trực tuyến'
              : FormatUserLastLoginTime(userInfo.last_Login)}
          </div>
        </div>
      </div>

      {/* Nội dung tin nhắn */}
      <div className="flex h-[50vh] flex-col space-y-3 overflow-y-auto bg-slate-300 p-4 dark:bg-slate-600">
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
                  <span className="text-sm text-slate-500">
                    {FormatMessageTime(data.uploadTime)}
                  </span>
                </div>
              )}
              <p>{showDivider}</p>
              <div
                className={`flex ${data.isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`min-w-[115px] max-w-md break-words rounded-xl p-3 ${data.isOwnMessage ? ' bg-blue-600 text-right text-white' : 'bg-slate-100 dark:bg-slate-700'}`}
                >
                  <div>{data.message}</div>
                  {data.uploadTime && (
                    <div className="mt-1 text-xs text-slate-400">
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

export default MessagePage;
