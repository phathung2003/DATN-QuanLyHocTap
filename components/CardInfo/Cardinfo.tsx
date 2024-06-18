'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from "@/components/Pagination/Pagination"

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
      
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-10 gap-x-14">
        {cards.map((card, index) => (
          <div key={index} className="max-w-sm w-72">
          <div className="rounded-lg border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900 px-4 pt-8 pb-10 shadow-xl">
            <div className="relative mx-auto w-36 rounded-full">
              <span className="absolute animate-ping right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
              <Image
                className="mx-auto h-auto w-full rounded-full"
                src={card.imgSrc}
                alt={card.name}
                width={144}
                height={144}
              />
            </div>
            <h1 className="my-1 text-center text-xl font-bold leading-8 text-slate-900">{card.name}</h1>
            <h3 className="font-semibold text-semibold text-center leading-6 text-slate-600">{card.role}</h3>
            <h5 className="text-center text-sm leading-6 text-slate-500 hover:text-slate-600">{card.phone}</h5>
            <ul className="mt-3 rounded bg-slate-100 py-2 px-3 text-slate-600 shadow-sm hover:text-slate-700 hover:shadow">
              <li className="flex items-center py-3 text-sm">
                <span>Trạng thái</span>
                <span className="ml-auto"><span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">Đang hoạt động</span></span>
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
