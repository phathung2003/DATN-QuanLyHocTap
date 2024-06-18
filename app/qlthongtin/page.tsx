import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Cardinfo from '@/components/CardInfo/Cardinfo';

const page = () => {
  return (
    <DefaultLayout>
      <div className="bg-slate-50 dark:bg-black mx-auto w-full max-w-screen-xl flex-1 py-10 text-center antialiased shadow-xl lg:px-4">
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-2 sm:grid-cols-1 gap-4 sm:mb-5">
            <div className="">
              <h2 className="font-manrope mb-6 text-2xl font-bold text-black dark:text-white max-xl:text-center text-left">
                Thông Tin Người Dùng
              </h2>
            </div>
            <div className="flex w-full flex-col justify-end gap-2.5 md:w-auto md:flex-row md:items-center">
              {/* button add product  */}
              <button
                type="button"
                className="bg-lime-600 hover:bg-lime-500 ml-auto inline-flex items-center gap-2.5 rounded-lg p-1.5 px-2 py-2 text-sm text-white dark:hover:text-white w-full items-center justify-center md:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span className="sr-only">Open modal</span>
                Thêm Thông Tin Mới
              </button>              

              {/* button filter  */}
              <button
                id="filterDropdownButton"
                data-dropdown-toggle="filterDropdown"
                className="focus:ring-slate-200 dark:focus:ring-slate-700 flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-700 focus:z-10 focus:outline-none focus:ring-4 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-600 md:w-auto"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-slate-400 mr-2 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
                Lọc
                <svg
                  className="-mr-1 ml-1.5 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
            </div>
          </div>

        <Cardinfo />
      </div>
    </DefaultLayout>
  );
};

export default page;
