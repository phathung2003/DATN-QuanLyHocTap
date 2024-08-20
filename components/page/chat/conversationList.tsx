'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { IUserRoom } from '@/backend/models/data/IChat';

import SearchBar from '@/components/element/field/searchBar';
import AddIcon from '@/public/vector/plus-bold.svg';
import { GetUserChatRoom } from '@/backend/database/chat';
import { SearchCoversation, FormatChatTime } from '@/backend/feature/chat';

const DefaultAvatar = '/images/users/user01.png';

interface Chat {
  userID: string;
}

const ConversationList: React.FC<Chat> = ({ userID }) => {
  const [friends, setFriends] = useState<IUserRoom[]>([]);
  const [currentRoom, setCurrent] = useState<string | null>(null);
  const [searchFriends, setSearchFriends] = useState<IUserRoom[]>(friends);
  const [search, setSearch] = useState<string>('');

  //Tìm kiếm
  useEffect(() => {
    setSearchFriends(SearchCoversation(search, friends));
  }, [search, friends]);

  //Lấy dữ liệu
  useEffect(() => {
    const unsubscribe = GetUserChatRoom(userID, (rooms) => {
      const sortedRooms = rooms.sort(
        (a, b) => b.lastUpdate.seconds - a.lastUpdate.seconds,
      );
      setFriends(sortedRooms);
    });

    // Ngắt kết nối listener khi component bị unmount
    return () => {
      unsubscribe();
    };
  }, [userID, setFriends]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Tin nhắn</div>
        <Link href="/admin/support/add">
          <AddIcon className=" stroke-black text-right dark:stroke-white" />
        </Link>
      </div>

      <SearchBar onChange={(e) => setSearch(e.target.value)} />

      <div className="mt-4 flex h-[65vh] w-full flex-col space-y-4 overflow-auto">
        {searchFriends.length == 0 ? (
          <p className="flex h-[65vh] items-center justify-center">
            Không có cuộc hội thoại nào
          </p>
        ) : (
          searchFriends.map((friend, index) => {
            let isReadMessage = false;
            if (friend.isRead) {
              isReadMessage = true;
            } else if (currentRoom == friend.chatRoomID) {
              isReadMessage = true;
            }
            return (
              <Link
                onClick={() => setCurrent(friend.chatRoomID)}
                href={`/admin/support/${friend.chatRoomID}`}
                key={index}
                className="flex cursor-pointer items-center space-x-4 rounded-md border-b border-slate-300 bg-slate-50 p-2 hover:bg-slate-300 dark:bg-graydark"
              >
                <div className="relative flex items-center">
                  <Image
                    src={DefaultAvatar}
                    alt={friend.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <span
                    className={`${friend.isOnline ? 'absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white' : ''}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="max-w-[13rem] truncate text-base font-semibold">
                      {friend.name}
                    </div>
                    <div className="ml-4 whitespace-nowrap text-right text-xs font-normal text-slate-400">
                      {FormatChatTime(friend.lastUpdate)}
                    </div>
                  </div>

                  <div
                    className={`mt-1 min-h-[20px] max-w-[12rem] truncate text-sm text-slate-400 ${isReadMessage ? 'font-normal' : 'font-bold'}`}
                  >
                    {friend.lastMessage}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
