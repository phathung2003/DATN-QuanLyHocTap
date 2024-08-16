'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/element/field/searchBar';
import { UserList } from '@/backend/database/users';
import { IUserChatInfo } from '@/backend/models/data/IChat';
import { CreateChatRoom, SearchUser } from '@/backend/feature/chat';

const DefaultAvatar = '/images/users/user01.png';

const AddConversation: React.FC = () => {
  const [userList, setUserList] = useState<IUserChatInfo[]>([]);
  const [searchUser, setsearchUser] = useState<IUserChatInfo[]>(userList);
  const [search, setSearch] = useState<string>('');

  //Tìm kiếm
  useEffect(() => {
    setsearchUser(SearchUser(search, userList));
  }, [search, userList]);

  //Lấy dữ liệu
  useEffect(() => {
    const unsubscribe = UserList((user) => {
      const sortedUser = user.sort((a, b) => a.name.localeCompare(b.name));
      setUserList(sortedUser);
    });

    // Ngắt kết nối listener khi component bị unmount
    return () => {
      unsubscribe();
    };
  }, [setUserList]);

  return (
    <div className="bg-gray-900 flex flex-1 flex-col">
      <div className="border-gray-700 border-b pb-4 text-xl font-bold ">
        <SearchBar onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/*Nội dung tin nhắn*/}
      <div className="bg-gray-900 mt-1 flex flex-col space-y-3 ">
        <div>
          <p className="text-2xl font-bold">Người hiện có</p>
        </div>

        <div className="max-h-[65vh] overflow-y-auto ">
          {searchUser.map((user) => (
            <div
              key={user.userID}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600 flex cursor-pointer items-center space-x-4 border-b p-2"
              onClick={() => CreateChatRoom(user.userID)}
            >
              <Image
                src={DefaultAvatar}
                alt="Avatar"
                width={50}
                height={50}
              ></Image>
              <div>
                <div className="font-semibold">{user.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddConversation;
