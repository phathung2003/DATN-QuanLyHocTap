/*eslint-disable */
'use client';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { KeepDateOnly, CheckTimeLeft } from '@/backend/feature/general';

//components
import SelectGroupTwo from '@/components/SelectGroup/SelectGroupTwo';
import ListIcon from '@/public/vector/menu.svg';

//button
import { IChildrenDB } from '@/backend/models/data/IChildren';
import { IChildrenAssignmentList } from '@/backend/models/data/IAssignment';
import CompletedIcon from '@/public/vector/circle-check.svg';

const LearnManager: React.FC<{
  children: IChildrenDB[];
  assignment: IChildrenAssignmentList[];
}> = ({ children, assignment }) => {
  // item đang mở
  const [openItem, setOpenItem] = useState<string | number | null>(null);

  //Bé được chọn
  const [selectedOption, setSelectedOption] = useState<string>(
    children.length == 0 ? '' : children[0].childrenID,
  );

  // thu danh sách
  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  const childAssignment = assignment.find(
    (child) => child.childrenID === selectedOption,
  );
  const assignments = childAssignment ? childAssignment.assignment : [];

  return (
    <section className="dark:bg-black">
      {/* Tổng quan */}
      <div className="dark:bg-black">
        <div className="grid grid-cols-1 gap-4">
          <div className="w-full py-5 antialiased lg:px-4">
            <h1
              id="header"
              className="font-manrope mb-5 text-2xl font-bold text-black dark:text-white"
            >
              Quản lý tiến độ học tập
            </h1>
            {/* nav */}
            <div className="z-20 flex flex-col items-center gap-1.5 rounded-xl bg-rose-100 py-4 pl-5 dark:bg-slate-800 md:flex-row md:justify-around">
              <div className="flex w-full items-center justify-between px-4">
                <div className="flex items-center justify-around">
                  <div>
                    <h1 className="text-md mr-8 text-left font-extrabold dark:text-white sm:block">
                      <p>Bé</p>
                    </h1>
                  </div>
                  <div className="ml-4 -translate-x-8 transform">
                    <SelectGroupTwo
                      children={children}
                      setOption={setSelectedOption}
                    />
                  </div>
                </div>

                <div>
                  {/* btn thêm giao bài mới */}
                  <Link
                    href="/parent/giaobai"
                    className="me-2 inline-flex items-center gap-2 rounded-lg bg-rose-700 p-2.5 text-center text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300  dark:bg-slate-700 dark:hover:bg-graydark/80 dark:focus:ring-rose-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6" />
                      <path d="M14 3v5h5M18 21v-6M15 18h6" />
                    </svg>
                    <span className="text-sm">Giao bài mới</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* table of danh sách giao bài */}
            {assignments.length == 0 ? (
              <p className="my-4 flex w-full justify-center text-lg font-bold">
                Hôm nay chưa giao bài học nào cho bé
              </p>
            ) : (
              <div className="mt-5 h-96 w-full overflow-auto">
                <div id="accordionExample" className="space-y-4">
                  {assignments.map((item, index) => (
                    <div
                      className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-500 dark:bg-graydark"
                      key={index}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-full">
                          <div className="accordion-header flex justify-between">
                            <div>
                              <div className="px-4 py-2 text-left text-base">
                                Thời hạn: {KeepDateOnly(item.deadline)}
                              </div>
                              <div className="px-4 py-2 text-left text-sm text-slate-600 dark:text-white">
                                {CheckTimeLeft(item.deadline)}
                              </div>
                            </div>
                            <div className="me-2 flex items-center justify-center space-x-4">
                              <button
                                type="button"
                                onClick={() => toggleItem(index)}
                                className={`rounded-lg bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 px-2.5 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-800 `}
                              >
                                <div>
                                  <ListIcon />
                                </div>
                              </button>
                            </div>
                          </div>
                          <div className="mr-5 flex w-full max-w-[calc(100%-10%)] items-center justify-between gap-4 px-4">
                            <div className="flex-grow">
                              <div className="h-2.5 w-full rounded-full bg-slate-500 dark:bg-slate-700">
                                <div
                                  className="h-2.5 rounded-full bg-lime-500"
                                  style={{ width: `${item.completed * 100}%` }}
                                />
                              </div>
                            </div>
                            <div className="min-w-[30px]">
                              {item.completed === 1 && (
                                <div>
                                  <CompletedIcon />
                                </div>
                              )}
                            </div>
                          </div>

                          <div
                            id={`collapse${index}`}
                            className={`accordion-collapse ${openItem === index ? 'block' : 'hidden'}`}
                            aria-labelledby={`heading${index}`}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body p-4 text-slate-500">
                              <ul className="space-y-2">
                                {Array.isArray(item.taskList) &&
                                  item.taskList.map((lesson, index) => {
                                    return (
                                      <li
                                        key={index}
                                        className="flex items-center"
                                      >
                                        <p className="mr-5 font-bold text-black dark:text-white">
                                          {index + 1}.
                                        </p>

                                        <div className="flex w-full items-center justify-between">
                                          <div className="font-semibold text-slate-700 dark:text-white">
                                            {lesson.task}
                                          </div>
                                          <div className="text-slate-500">
                                            {lesson.status && <CompletedIcon />}
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnManager;
