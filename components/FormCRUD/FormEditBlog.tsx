import React from 'react';

const FormEditBlog = () => {
  return (
    <div>
      <form action="#">
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Tiêu đề: <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value="Các bé nhạy bén hơn khi được rèn luyện mỗi ngày"
              className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              placeholder="Các bé nhạy bén hơn khi được rèn luyện mỗi ngày"
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="mb-2 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Mô tả ngắn
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              value="Các bé nhạy bén hơn khi được rèn luyện mỗi ngày"
              className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              placeholder="Các bé nhạy bén hơn khi được rèn luyện mỗi ngày"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Danh mục: <span className="text-rose-600">*</span>
            </label>
            <select
              id="category"
              className="focus:ring-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
            >
              <option selected value="">
                Sáng tạo
              </option>
              <option value="PC">Phụ Huynh</option>              
              <option value="PH">Học sinh</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">
              Ảnh bài viết: <span className="text-rose-600">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-xs focus:border-blue-500 file:focus:border-blue-500 active:border-blue-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
            />
          </div>
        </div>
        <div className="mb-3">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Mô tả: <span className="text-rose-600">*</span>
            </label>
            <textarea
              rows={6}
              placeholder="Nhập vào mô tả..."              
              defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas expedita non ratione asperiores quidem rem suscipit, quaerat adipisci recusandae praesentium, illum beatae magni animi id accusantium, perferendis sapiente libero odio?"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            ></textarea>
          </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Cập nhật bài viết
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-rose-600 px-5 py-2.5 text-center text-sm font-medium text-rose-600 hover:bg-rose-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-rose-300 dark:border-rose-500 dark:text-rose-500 dark:hover:bg-rose-600 dark:hover:text-white dark:focus:ring-rose-900"
          >
            <svg
              className="stroke-current text-rose-700 hover:text-white dark:text-rose-500 dark:hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d01d02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Xóa
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditBlog;
