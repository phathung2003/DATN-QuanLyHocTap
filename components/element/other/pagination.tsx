import React from 'react';

const Pagination = () => {
  return (
    <div className="wow fadeInUp -mx-4 flex flex-wrap" data-wow-delay=".15s">
      <div className="w-full px-4">
        <ul className="flex items-center justify-end pt-8">
          <li className="mx-1">
            <a
              href="#0"
              className="text-body-color flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-500 bg-opacity-[15%] px-4 text-sm transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
            >
              Prev
            </a>
          </li>
          <li className="mx-1">
            <a
              href="#0"
              className="text-body-color flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-500 bg-opacity-[15%] px-4 text-sm transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
            >
              1
            </a>
          </li>
          <li className="mx-1">
            <a
              href="#0"
              className="text-body-color flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-500 bg-opacity-[15%] px-4 text-sm transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
            >
              2
            </a>
          </li>
          <li className="mx-1">
            <a
              href="#0"
              className="text-body-color flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-500 bg-opacity-[15%] px-4 text-sm transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
            >
              3
            </a>
          </li>
          <li className="mx-1">
            <span className="text-body-color flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-slate-500 bg-opacity-[15%] px-4 text-sm">
              ...
            </span>
          </li>
          <li className="mx-1">
            <a
              href="#0"
              className="text-body-color flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-500 bg-opacity-[15%] px-4 text-sm transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
            >
              12
            </a>
          </li>
          <li className="mx-1">
            <a
              href="#0"
              className="text-body-color flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-500 bg-opacity-[15%] px-4 text-sm transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
