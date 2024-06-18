'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


const QlBaiHoc = () => {
  const [baiHoc] = useState([
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      author: 'Jessica',
      name: 'Bài học số 1',
      description: 'This specification defines the features and syntax',
    },
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      author: 'Sukhidaha',
      name: 'Bài học số 2',
      description: 'This specification defines the features and syntax',
    },
    {
      src: '/images/qlbaihoc/baihoc1.jpg',
      author: 'Nguyễn minh',
      name: 'Bài học số 3',
      description: 'This specification defines the features and syntax',
    },
  ]);

  const [writter, setData] = useState([
    {
      creator: 'Alenda Nguyễn',
      posts: 1480,
      progress: 60,
      progressColor: 'red',
    },
    { 
      creator: 'Minh Lê',
      posts: 5480,
      progress: 70,
      progressColor: 'emerald',
    },
    {
      creator: 'Chin Chen',
      posts: 4807,
      progress: 80,
      progressColor: 'indigo',
    },
    {
      creator: 'Chin Chen',
      posts: 4807,
      progress: 80,
      progressColor: 'indigo',
    }
  ]);

  return (
    <section className="bg-slate-50 dark:bg-black mx-auto w-full max-w-screen-xl flex-1 py-10 antialiased shadow-xl lg:px-4">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-14 flex justify-between sm:gap-4">
        <div className="sx:text-center">
          <h2 className="font-manrope mb-2 text-2xl font-bold text-black dark:text-white lg:text-left max-xl:text-left md:text-center sm:text-center xs:text-center">
            Danh Sách Bài Học
          </h2>
        </div>
        <div className="lg:text-right xl:text-right md:text-center sm:text-center xs:w-full">
          <Link
            href="/qlbaihoc/thembaihoc"
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-lime-500 px-2 py-2 font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 xs:w-full"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6" />
              </svg>
            </span>
            Tạo Bài Học Mới
          </Link>
        </div>
      </div>
      {/* ---------------- SECTION BÀI HỌC ------------------------------------------------- */}
      <div className="mx-auto mb-15 mt-10 grid w-fit grid-cols-1 justify-center justify-items-center gap-x-20 gap-y-20 md:grid-cols-2 lg:grid-cols-3 sx:grid-cols-1 sx:w-full">
        {baiHoc.map((item, index) => (
          <div
            key={index}
            className="w-72 rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl"
          >
            <a href="#">
              <img
                src={item.src}
                alt={item.name}
                className="h-40 w-72 rounded-t-xl object-cover object-center  group-hover:scale-105 transition-all ease duration-300"
              />
              <div className="w-72 px-4 py-3">
                <span className="text-gray-400 mr-3 text-xs uppercase">
                  {item.author}
                </span>
                <p className="block truncate text-lg font-bold capitalize text-black">
                  {item.name}
                </p>
                <div className="flex items-center">
                  <p className="text-gray-600 my-3 cursor-auto text-sm font-semibold">
                    {item.description}
                  </p>
                  {/* <del>
                      <p className="text-gray-600 ml-2 cursor-auto text-sm">
                        {item.des}
                      </p>
                    </del> */}
                  <div className="ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f58f23"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                      <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* ---------------- SECTION TẠO BÀI HỌC MẪU ------------------------------------------------- */}
      <h2 className="font-manrope mb-10 sm:mb-5 text-2xl font-bold text-black dark:text-white max-xl:text-center">
        Tiếp tục tạo bài học
      </h2>

      <div className="grid grid-cols-2 gap-14 xl:grid-cols-2 sm:grid-cols-1">
        <div className="">
          <div className="mx-auto grid w-full max-w-xl gap-4 sm:grid-cols-2">
            <Image
              alt="Product Image"
              className="border-gray-200 dark:border-gray-800 aspect-square w-full overflow-hidden rounded-lg border object-cover duration-500 hover:scale-105 hover:shadow-lg"
              height={300}
              src="/images/qlbaihoc/baihoc1.jpg"
              width={300}
            />
            <div className="grid gap-4">
              <div className="grid gap-1">
                <h2 className="text-2xl font-bold">Bài Học Số 142</h2>
                <p className="text-gray-500 dark:text-gray-400 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In,
                  deserunt omnis sit impedit eum 
                </p>
              </div>
              {/* thanh tiến độ */}
              <div>
                <div className="dark:bg-gray-700 h-2.5 w-full rounded-full bg-slate-500">
                  <div className="h-2.5 w-2/3 rounded-full bg-lime-500"></div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="w-full inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Tiếp tục tạo bài học
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="...">
          <div className="w-full px-2 xl:w-full">
            <div className="text-blueGray-700 relative mb-8 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-lg">
              <div className="border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative mx-auto w-5/6 max-w-full flex-1 flex-grow">
                    {/* <h3 className="text-blueGray-700 text-lg font-bold">
                      Bài Học Nổi Bật
                    </h3> */}
                    <Link
                      href="#"
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-rose-700 px-2 py-2 text-center font-medium text-white hover:bg-opacity-80 lg:px-8 xl:px-10 duration-500 hover:scale-105 hover:shadow-lg"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6" />
                        </svg>
                      </span>
                      Tạo Bài Học Mẫu cho PH
                    </Link>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="w-full border-collapse items-center bg-transparent dark:bg-slate-900">
                  <thead>
                    <tr>
                      <th className="bg-blueGray-100 text-blueGray-600 border-blueGray-200 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-bold uppercase">
                        Người tạo
                      </th>
                      <th className="bg-blueGray-100 text-blueGray-600 border-blueGray-200 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-bold uppercase">
                        Số bài
                      </th>
                      <th className="bg-blueGray-100 text-blueGray-600 border-blueGray-200 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-bold uppercase">
                        Tiến độ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {writter.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                          <div className="flex items-center">
                            <span className="ml-3 font-bold">
                              {item.creator}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                          <div className="flex items-center">
                            {item.posts.toLocaleString()}
                          </div>
                        </td>
                        <td className="min-w-140-px whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                          <div className="flex items-center">
                            <span className="mr-2">{item.progress}%</span>
                            <div className="relative w-full">
                              <div
                                className={`flex h-2 overflow-hidden rounded bg-${item.progressColor}-200 text-xs`}
                              >
                                <div
                                  className={`flex w-${item.progress}/100 flex-col justify-center whitespace-nowrap bg-${item.progressColor}-500 text-center text-white shadow-none`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QlBaiHoc;
