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

const Sidebar: React.FC<Chat> = ({ userID }) => {
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
                className="bg-gray-700 border-gray-600 hover:bg-gray-600 flex cursor-pointer items-center space-x-4 border-b p-2"
              >
                <Image
                  src={DefaultAvatar}
                  alt={friend.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="max-w-[13rem] truncate text-base font-semibold">
                      {friend.name}
                    </div>
                    <div className="text-gray-400 ml-4 whitespace-nowrap text-right text-xs font-normal">
                      {FormatChatTime(friend.lastUpdate)}
                    </div>
                  </div>

                  <div
                    className={`text-gray-400 mt-1 min-h-[20px] max-w-[12rem] truncate text-sm ${isReadMessage ? 'font-normal' : 'font-bold'}`}
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

export default Sidebar;
