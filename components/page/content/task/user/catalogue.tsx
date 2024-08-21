'use client';
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { IContentCourseList } from '@/backend/models/data/Content/IContent';

const CatalogueList: React.FC<{
  data: IContentCourseList[];
  openSidebar: boolean;
  setContent;
}> = ({ data, openSidebar, setContent }) => {
  return (
    <div
      className={`relative ${
        openSidebar ? 'w-90 ' : 'hidden'
      } rounded-xl p-2 shadow-xl dark:bg-slate-800`}
    >
      {/* Danh sách bài học */}
      <div className="rounded-lg p-2 shadow-sm">
        <div className="mb-5 flex flex-col items-center justify-between gap-2">
          <h2 className="w-full text-lg font-bold text-slate-700 dark:text-white">
            Nội dung bài học
          </h2>
        </div>

        <div className="h-[40vh] space-y-4 overflow-y-auto overflow-x-hidden ">
          {data.length === 0 ? (
            <p className="text-center text-lg font-bold">
              Không có bài học nào
            </p>
          ) : (
            data.map((unitData) => (
              <Disclosure
                key={unitData.unitNo}
                as="div"
                className="transition duration-300 ease-in-out"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-rose-100 px-4 py-2 text-left text-sm font-medium text-rose-900 transition duration-300 ease-in-out hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75">
                      <div>
                        <p>
                          {unitData.unitNo}. {unitData.unitName}
                        </p>
                        <p>sssss</p>
                      </div>
                      <svg
                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-rose-500 transition-transform duration-300 ease-in-out`}
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

                    <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-slate-500  dark:text-slate-200">
                      {unitData.task.map((taskData) => (
                        <div
                          key={taskData.taskNo}
                          onClick={() => setContent(taskData.content)}
                        >
                          <span>
                            {taskData.taskNo}. {taskData.taskName}
                          </span>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogueList;
