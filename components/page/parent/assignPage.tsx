/*eslint-disable */
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Datepicker from '@/components/element/other/datePicker';
import SelectGroupTwo from '@/components/SelectGroup/SelectGroupTwo';
import { AddAssignment } from '@/backend/feature/assignment';
import { DefaultAssignmentErrorValue } from '@/backend/defaultData/assignment';

//Button - Icon
import ListIcon from '@/public/vector/menu.svg';
import ICourse from '@/backend/models/data/ICourse';
import { TableName } from '@/backend/globalVariable';
import { IChildrenDB } from '@/backend/models/data/IChildren';
import { IAssignmentError } from '@/backend/models/data/IAssignment';

const defaultImage = '/images/defaultImage.webp';

const Giaobai: React.FC<{
  parentID: string;
  courseInfo: ICourse[];
  children: IChildrenDB[];
}> = ({ parentID, courseInfo, children }) => {
  // item đang mở
  const [openItem, setOpenItem] = useState<string | number | null>(null);
  const [error, SetError] = useState<IAssignmentError>(
    DefaultAssignmentErrorValue(),
  );

  //Ngày chọn
  const [pickDate, setPickDate] = useState<Date>(new Date());

  //Bài học được chọn
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);

  //Bé được chọn
  const [selectedOption, setSelectedOption] = useState<string>(
    children.length == 0 ? '' : children[0].childrenID,
  );

  // thu danh sách
  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  // bài học được chọn
  const handleLessonSelect = (courseId, lessonId) => {
    const error = DefaultAssignmentErrorValue();
    SetError(error);
    const lessonKey = `/${TableName.COURSE}/${courseId}/${TableName.UNIT}/${lessonId}`;
    setSelectedLessons((prevSelectedLessons) => {
      if (prevSelectedLessons.includes(lessonKey)) {
        return prevSelectedLessons.filter((key) => key !== lessonKey);
      } else {
        return [...prevSelectedLessons, lessonKey];
      }
    });
  };

  // Bỏ chọn hết các bài học đã chọn
  const handleDeselectAll = () => {
    setSelectedLessons([]);
  };

  if (children.length == 0) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-center">
        <div>
          <p className="text-3xl font-bold">
            Bạn hiện tại chưa có tài khoản nào của bé
          </p>
          <p className="mb-5 mt-2 text-lg">
            Xin hãy tạo tài khoản cho bé để tiếp tục
          </p>
          <a href="/parent/child">
            <button className="inline-block rounded-lg bg-blue-500 px-6 py-2 text-center font-semibold text-white transition duration-300 hover:bg-blue-600">
              Tạo tài khoản cho bé
            </button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="h-auto p-6">
        <h1
          id="header"
          className="font-manrope mb-6 text-2xl font-bold text-black dark:text-white"
        >
          Giao Bài Học Mới Cho Bé
        </h1>

        <div className="z-20 my-10 flex flex-col items-center gap-1.5 rounded-xl bg-rose-100 p-2 dark:bg-slate-800 md:flex-row md:justify-around">
          <span className="items-center text-sm font-extrabold dark:text-white sm:block">
            Chọn ngày hết hạn
          </span>
          <div className="z-999 -translate-x-10 transform">
            <Datepicker setPickDate={setPickDate} />
          </div>
          <h1 className="items-center text-sm font-extrabold dark:text-white sm:block">
            Giao Bài Cho
          </h1>
          <div className="-translate-x-10 transform">
            <SelectGroupTwo children={children} setOption={setSelectedOption} />
          </div>
          <Link
            href="#"
            className="inline-flex w-full items-center justify-center rounded-md bg-rose-700 px-1.5 py-3 text-center text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-slate-700 dark:hover:bg-graydark/80 lg:w-1/6 lg:px-8 xl:px-5"
            onClick={() =>
              AddAssignment(
                selectedLessons,
                parentID,
                selectedOption,
                pickDate,
                SetError,
              )
            }
          >
            Hoàn tất giao bài
          </Link>
        </div>

        {/* Chọn bài học từ list khóa học */}
        <div id="listKhoaHoc" className="mt-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-manrope text-lg font-bold text-black dark:text-white">
              Chọn bài học
            </h2>
            <div className="flex items-center space-x-2">
              <span className="font-manrope text-md text-slate-500 dark:text-slate-400">
                Số bài học đã chọn:
              </span>
              <button className="rounded-lg bg-blue-500 px-4 py-1 text-sm text-white">
                {selectedLessons.length}
              </button>
              <button
                onClick={handleDeselectAll}
                className="rounded-lg bg-rose-500 px-3 py-1 text-sm text-white hover:bg-rose-800"
              >
                Bỏ chọn tất cả
              </button>
            </div>
          </div>
          <p className="mb-2 w-full items-center justify-center text-center text-lg font-bold text-rose-500">
            {error.notChooseTask}
          </p>
          <div id="accordionExample" className="space-y-4">
            {courseInfo
              .filter(
                (item) =>
                  Array.isArray(item.unitList) && item.unitList.length > 0,
              )
              .map((item, index) => (
                <div
                  className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-500 dark:bg-graydark"
                  key={index}
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      className="rounded-xl"
                      src={item.courseImage ?? defaultImage}
                      width={100}
                      height={100}
                      alt={item.courseName}
                    />
                    <div className="w-full">
                      <div className="accordion-header flex justify-between">
                        <div>
                          <button
                            className={`accordion-button ${openItem === item.courseID ? '' : 'collapsed'} text-md w-full px-4 py-2 text-left font-bold text-slate-700 focus:outline-none dark:text-white`}
                            type="button"
                            onClick={() => toggleItem(item.courseID)}
                            aria-expanded={
                              openItem === item.courseID ? 'true' : 'false'
                            }
                            aria-controls={`collapse${item.courseID}`}
                          >
                            {item.courseName}
                          </button>
                          <div className="px-4 py-2 text-left text-sm text-slate-600 dark:text-white">
                            Số lượng bài: {item.unit}
                          </div>
                        </div>
                        <div className="me-2 flex items-center justify-center space-x-4">
                          <button
                            type="button"
                            onClick={() => toggleItem(item.courseID)}
                            className={`rounded-lg bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 px-1.5 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-rose-300 dark:stroke-slate-800 dark:focus:ring-rose-800 `}
                          >
                            <div>
                              <ListIcon />
                            </div>
                          </button>
                        </div>
                      </div>
                      <div
                        id={`collapse${item.courseID}`}
                        className={`accordion-collapse ${openItem === item.courseID ? 'block' : 'hidden'}`}
                        aria-labelledby={`heading${item.courseID}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body p-4 text-slate-500">
                          <ul className="space-y-2">
                            {Array.isArray(item.unitList) &&
                              item.unitList.map((lesson) => {
                                const lessonKey = `/${TableName.COURSE}/${item.courseID}/${TableName.UNIT}/${lesson.unitID}`;
                                return (
                                  <li
                                    key={lesson.unitID}
                                    className="flex items-center"
                                  >
                                    <input
                                      type="checkbox"
                                      className="mr-5 h-4 w-4 rounded border-slate-300 bg-slate-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:ring-offset-slate-800 dark:focus:ring-blue-600"
                                      checked={selectedLessons.includes(
                                        lessonKey,
                                      )}
                                      onChange={() =>
                                        handleLessonSelect(
                                          item.courseID,
                                          lesson.unitID,
                                        )
                                      }
                                    />
                                    <div>
                                      <div className="font-semibold text-slate-700 dark:text-white">
                                        {lesson.unitName}
                                      </div>
                                      <div className="text-slate-500">
                                        {lesson.unitDescription}
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
      </div>
    </section>
  );
};

export default Giaobai;
