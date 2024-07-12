import React from 'react';
import SelectGroupOne from '@/components/SelectGroup/SelectGroupOne';

const page = () => {
  return (
    <div className="flex flex-col gap-9">
      {/* <!-- Contact Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="text-center text-xl font-medium text-black dark:text-white">
            Thêm Bài Học Mới
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Tiêu đề bài học: <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Điền vào tiêu đề"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ảnh minh họa: <span className="text-rose-600">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>
            </div>

            {/* select */}
            <SelectGroupOne />

            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mô tả bài học: <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={6}
                placeholder="Điền vào mô tả"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 text-sm font-medium text-gray hover:bg-opacity-90">
              Hoàn Tất Bài Học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
