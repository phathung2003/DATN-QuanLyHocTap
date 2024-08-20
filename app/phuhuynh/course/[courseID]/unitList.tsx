'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import { SearchUnit } from '@/backend/feature/unit';
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

      {/* Thông tin khóa học */}
      <div className="my-5 grid grid-cols-1 gap-4 rounded-md bg-rose-100 p-5 md:grid-cols-3">
        <div className="col-span-1 flex items-center justify-end">
          <Image
            src={courseInfo.courseImage ?? DefaultAvatar}
            alt="Avatar"
            width={240}
            height={60}
            className="rounded-lg"
          />
        </div>
        <div className="col-span-2">
          <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
            Khóa học: {courseInfo.courseName}
          </h2>
          <p className="mb-2 text-slate-700 dark:text-slate-300">
            {courseInfo.courseDescription || 'Không có mô tả nào'}
          </p>
          <div className="mt-2 flex items-center space-x-2">
            <span className="rounded bg-blue-700 px-2.5 py-0.5 text-sm font-semibold text-white">
              {courseInfo.courseSubjectName || 'Không xác định'}
            </span>
            <span className="rounded bg-orange-600 px-2.5 py-0.5 text-sm font-semibold text-white">
              {courseInfo.courseGradeName || 'Không xác định'}
            </span>
          </div>
        </div>
      </div>

      {/* Danh sách bài học */}
      <div className="mt-5">
        <div className="my-8 flex items-center justify-between">
          <h2 className="font-manrope my-3 w-5/6 text-2xl font-bold text-black dark:text-white">
            Danh sách bài học
          </h2>
          <SearchBar onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {searchUnit.length === 0 ? (
            <p className="col-span-full text-center text-lg font-bold">
              Không có bài học nào
            </p>
          ) : (
            searchUnit.map((unitData) => (
              <div
                key={unitData.unitNo}
                className="rounded-lg bg-white p-4 shadow-md dark:bg-slate-800"
              >
                <h3 className="text-md mb-3 font-semibold">
                  {unitData.unitName}
                </h3>
                <h4 className="mb-3 text-sm font-normal text-slate-600">
                  {unitData.unitDescription}
                </h4>
                <p className="mb-5 text-sm text-slate-500">
                  Bài số: {unitData.unitNo}
                </p>
                <DetailButton
                  link={`/phuhuynh/course/${courseID}/unit/${unitData.unitID}`}
                  buttonName="Chi tiết"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UserUnitList;
