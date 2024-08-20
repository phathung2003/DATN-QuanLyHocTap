'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';

import { SearchTask } from '@/backend/feature/task';
import ITask from '@/backend/models/data/ITask';
import IUnit from '@/backend/models/data/IUnit';

// Button
import SearchBar from '@/components/element/field/searchBar';

const UserTaskList: React.FC<{
  courseID: string;
  unitID: string;
  unitInfo: IUnit;
  taskList: ITask[];
}> = ({ courseID, unitInfo, taskList }) => {
  const [searchTask, setSearchTask] = useState<ITask[]>(taskList);
  const [search, setSearch] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Tìm kiếm
  useEffect(() => {
    setSearchTask(SearchTask(search, taskList));
  }, [search, taskList]);

  return (
    <section className="overflow-none relative px-4 lg:px-4">
      <div className="relative flex flex-1 flex-row justify-between gap-4">
        {/* Nửa trái - nội dung hiển thị */}
        <div className="w-full">
          <div className="h-screen overflow-y-scroll rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
            <h3 className="text-2xl font-bold text-black dark:text-white">
              Nội dung hiển thị
            </h3>
            <p className="mt-4 text-lg text-slate-700"></p>
          </div>
        </div>

        {/* Nút menu mở mục lục bài học */}
        <button
          className="fixed right-6 top-[96px] z-50 rounded-full bg-rose-500 p-2 text-white shadow-lg"
          onClick={() => setIsSidebarOpen((curr) => !curr)}
        >
          {isSidebarOpen ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* nút back */}
        <div className="fixed right-6 top-[156px] z-50 rounded-full bg-blue-300 p-2 text-white shadow-lg">
          <Link href={`/phuhuynh/course/${courseID}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
        </div>

        {/* Nửa phải - mục lục bài học */}
        <div
          className={`h-screen transform overflow-y-scroll rounded-xl bg-white p-2 shadow-xl transition-transform duration-300 ease-in-out dark:bg-slate-800 ${
            isSidebarOpen
              ? 'w-4/12 transition duration-700 ease-in-out'
              : 'pointer-events-none w-0 opacity-0'
          }`}
        >
          {/* Thông tin khóa học */}
          <div className="mt-3 p-3">
            <h2 className="mb-2 text-lg font-bold text-slate-700 dark:text-white">
              {unitInfo.unitName}
            </h2>
            <p className="mb-2 text-sm text-slate-500 dark:text-white">
              {unitInfo.unitDescription || 'Không có mô tả nào'}
            </p>
          </div>

          {/* Danh sách bài học */}
          <div className="rounded-lg p-2 shadow-sm">
            <div className="mb-5 flex flex-col items-center justify-between gap-2">
              <h2 className="w-full text-lg font-bold text-slate-700 dark:text-white">
                Nội dung bài học
              </h2>
              <SearchBar onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="space-y-4">
              {searchTask.length === 0 ? (
                <p className="text-center text-lg font-bold">
                  Không có câu nào
                </p>
              ) : (
                searchTask.map((taskData) => (
                  <Disclosure key={taskData.taskNo}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-rose-100 px-4 py-2 text-left text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75">
                          <span>
                            Câu số {taskData.taskNo} - {taskData.taskName}
                          </span>
                          <svg
                            className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-rose-500`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FF4E88"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </Disclosure.Button>

                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-slate-500">
                          <p>{taskData.taskDescription}</p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTaskList;
