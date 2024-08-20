'use client';
import React from 'react';
import Image from 'next/image';
import Pagination from '@/components/element/other/pagination';

const Cardinfo = () => {
  const cards = [
    {
      name: 'Alex Trần',
      role: 'Writter',
      phone: '0795738586',
      imgSrc: '/images/qlthongtin/user01.jpg',
    },
    {
      name: 'Minh Hoàng',
      role: 'Writter',
      phone: '0795738586',
      imgSrc: '/images/qlthongtin/user01.jpg',
    },
    {
      name: 'Văn Dương',
      role: 'Admin',
      phone: '0795738586',
      imgSrc: '/images/qlthongtin/user01.jpg',
    },
  ];

  return (
    <div className="relative p-0">
      {/* Danh sách thông tin nhân sự */}

      <div className="mx-auto grid w-fit grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div key={index} className="w-72 max-w-sm">
            <div className="rounded-lg border border-slate-200 bg-white px-4 pb-10 pt-8 shadow-xl dark:border-slate-900 dark:bg-slate-900">
              <div className="relative mx-auto w-36 rounded-full">
                <span className="absolute right-0 m-3 h-3 w-3 animate-ping rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                <Image
                  className="mx-auto h-auto w-full rounded-full"
                  src={card.imgSrc}
                  alt={card.name}
                  width={144}
                  height={144}
                />
              </div>
              <h1 className="my-1 text-center text-xl font-bold leading-8 text-slate-900">
                {card.name}
              </h1>
              <h3 className="text-semibold text-center font-semibold leading-6 text-slate-600">
                {card.role}
              </h3>
              <h5 className="text-center text-sm leading-6 text-slate-500 hover:text-slate-600">
                {card.phone}
              </h5>
              <ul className="mt-3 rounded bg-slate-100 px-3 py-2 text-slate-600 shadow-sm hover:text-slate-700 hover:shadow">
                <li className="flex items-center py-3 text-sm">
                  <span>Trạng thái</span>
                  <span className="ml-auto">
                    <span className="rounded-full bg-green-200 px-2 py-1 text-xs font-medium text-green-700">
                      Đang hoạt động
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Đã avtive</span>
                  <span className="ml-auto">09, 12 Năm 2024</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default Cardinfo;
