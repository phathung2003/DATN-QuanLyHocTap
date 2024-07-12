import React from 'react';

const FormAddBlog = () => {
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
              className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-600 focus:ring-blue-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Nhập tiêu đề..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="mb-2 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Mô tả ngắn: <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              placeholder="Nhập mô tả ngắn..."
              required
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
              className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
            >
              <option value="">Chọn</option>
              <option value="TV">Sáng tạo</option>
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
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-sm text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          ></textarea>
        </div>
        <div>
          <ul className="mb-5 w-full items-center rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white sm:flex">
            <li className="w-full border-b border-slate-200 dark:border-slate-600 sm:border-b-0 sm:border-r">
              <div className="flex items-center ps-3">
                <input
                  id="vue-checkbox-list"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 bg-slate-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-slate-500 dark:bg-slate-600 dark:ring-offset-slate-700 dark:focus:ring-blue-600 dark:focus:ring-offset-slate-700"
                />
                <label
                  htmlFor="vue-checkbox-list"
                  className="ms-2 w-full py-3 text-sm font-medium text-slate-900 dark:text-slate-300"
                >
                  Is Hot ?
                </label>
              </div>
            </li>
            <li className="w-full border-b border-slate-200 dark:border-slate-600 sm:border-b-0 sm:border-r">
              <div className="flex items-center ps-3">
                <input
                  id="react-checkbox-list"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 bg-slate-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-slate-500 dark:bg-slate-600 dark:ring-offset-slate-700 dark:focus:ring-blue-600 dark:focus:ring-offset-slate-700"
                />
                <label
                  htmlFor="react-checkbox-list"
                  className="ms-2 w-full py-3 text-sm font-medium text-slate-900 dark:text-slate-300"
                >
                  Is Public ?
                </label>
              </div>
            </li>
            <li className="w-full border-b border-slate-200 dark:border-slate-600 sm:border-b-0 sm:border-r">
              <div className="flex items-center ps-3">
                <input
                  id="angular-checkbox-list"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 bg-slate-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-slate-500 dark:bg-slate-600 dark:ring-offset-slate-700 dark:focus:ring-blue-600 dark:focus:ring-offset-slate-700"
                />
                <label
                  htmlFor="angular-checkbox-list"
                  className="ms-2 w-full py-3 text-sm font-medium text-slate-900 dark:text-slate-300"
                >
                  Is Homepage ?
                </label>
              </div>
            </li>
          </ul>
        </div>
        <button
          type="submit"
          className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-lime-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-lime-800 focus:outline-none focus:ring-4"
        >
          <svg
            className="-ml-1 mr-1 h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Thêm bài viết
        </button>
      </form>
    </div>
  );
};

export default FormAddBlog;
