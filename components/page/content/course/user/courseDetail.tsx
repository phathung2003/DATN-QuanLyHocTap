'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { SearchUnit } from '@/backend/feature/content/unit';
import { KeepDateOnly } from '@/backend/feature/general';
import IUnit from '@/backend/models/data/IUnit';
import ICourse from '@/backend/models/data/ICourse';

//Button
import BackContentButton from '@/components/element/button/backContentButton';
import DetailButton from '@/components/element/button/detailButton';
import SearchBar from '@/components/element/field/searchBar';

const DefaultAvatar = '/images/users/user01.png';
const UserUnitList: React.FC<{
  courseID: string;
  courseInfo: ICourse;
  unitList: IUnit[];
}> = ({ courseID, courseInfo, unitList }) => {
  const [searchUnit, setSearchUnit] = useState<IUnit[]>(unitList);
  const [search, setSearch] = useState<string>('');

  //Tìm kiếm
  useEffect(() => {
    setSearchUnit(SearchUnit(search, unitList));
  }, [search, unitList]);

  return (
    <section className="antialiase overflow-y-auto px-4 lg:px-8">
      <BackContentButton url={`/phuhuynh/course`} />
      <div className="my-3 flex items-center justify-between">
        <div className="mt-4 flex items-center">
          <Image
            src={DefaultAvatar}
            alt="Avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="ml-2">
            <p className="text-gray-900 dark:text-gray-100 text-sm">
              {courseInfo.courseAuthor ?? 'Không xác định'}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-xs">
              {courseInfo.courseLastEditDate
                ? KeepDateOnly(courseInfo.courseLastEditDate)
                : courseInfo.courseUploadDate
                  ? KeepDateOnly(courseInfo.courseUploadDate)
                  : 'Không xác định'}
            </p>
          </div>
        </div>
        <div>Nút quản lý</div>
      </div>

      <div>
        <div className="flex">
          {/* Nửa trái */}
          <div className="flex w-[40%] items-start">
            <div className="relative w-full">
              <div id="courseImage">
                <div className="h-50 bg-slate-300">
                  <div className="relative h-full w-full">
                    <Image
                      src={courseInfo.courseImage ?? ''}
                      alt="Course cover"
                      fill
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-20"></div>{' '}
                    {/* Lớp phủ màu tối */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nửa phải */}
          <div className="ml-2 flex w-[60%]">
            <div className="relative w-full">
              <p id="courseID" className="text-sm font-medium">
                Mã khóa học: {courseID}
              </p>

              <div id="courseName" className="mt-2 text-lg font-bold">
                Tên khóa học: {courseInfo.courseName}
              </div>

              <div className="mt-2">
                <span className="rounded bg-blue-700 px-2.5 py-0.5 text-sm font-semibold text-white ">
                  {courseInfo.courseSubjectName ?? 'Không xác định'}
                </span>
                <span className="ml-2 rounded bg-orange-600 px-2.5 py-0.5 text-sm font-semibold text-white ">
                  {courseInfo.courseGradeName ?? 'Không xác định'}
                </span>
              </div>

              <div
                id="courseDescription"
                className="text-gray-900 mb-2 mt-4 block text-sm font-medium dark:text-white"
              >
                <p>
                  {courseInfo.courseDescription == ''
                    ? 'Không có mô tả nào'
                    : courseInfo.courseDescription}
                </p>
              </div>

              <div className="absolute bottom-1 right-2 flex justify-end space-x-4"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
          <div>
            <h2
              id="header"
              className="font-manrope my-3 text-2xl font-bold text-black dark:text-white"
            >
              Danh sách bài học
            </h2>
          </div>
          <SearchBar onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex max-h-[65vh] flex-col overflow-auto">
          <table id="table" className="w-full">
            <thead className="text-gray-400 sticky top-0 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
              <tr>
                <th id="idHead" className="w-[5rem] text-center">
                  Bài số
                </th>
                <th id="nameHead" className="px-4 py-3">
                  Tên bài học
                </th>
                <th id="managerOptionHead" className="w-[20rem] px-4 py-3"></th>
              </tr>
            </thead>
            {searchUnit.length == 0 ? (
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <p className="my-4 flex w-full justify-center text-lg font-bold">
                      Không có bài học nào
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="h-[50px] items-center divide-y">
                {searchUnit.map((unitData) => (
                  <tr
                    key={unitData.unitNo}
                    className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
                  >
                    <td id="unitID" className="w-[5rem] text-center">
                      {unitData.unitNo}
                    </td>

                    <td id="name" className="px-4">
                      {unitData.unitName}
                    </td>

                    <td>
                      <div
                        id="managerOption"
                        className="flex items-center justify-end px-2 py-3"
                      >
                        <DetailButton
                          link={`/phuhuynh/course/${courseID}/unit`}
                          buttonName="Chi tiết"
                        />
                        <div className="ml-4"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserUnitList;
