import React from 'react';

const FormAddAccount = () => {
  return (
    <div>
      <form action="#">
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Tài Khoản: <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              placeholder="Điền tên tài khoản"
              required
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Người dùng: <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Người dùng"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Mật Khẩu: <span className="text-rose-600">*</span>
            </label>
            <input
              type="password"
              name="price"
              id="price"
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="*********"
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Vai trò: <span className="text-rose-600">*</span>
            </label>
            <select
              id="category"
              className="text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            >
              <option value="">Chọn</option>
              <option value="TV">Admin</option>
              <option value="PC">Phụ Huynh</option>
              <option value="GA">Người viết bài/Console</option>
              <option value="PH">Học sinh</option>
            </select>
          </div>
        </div>

        <span className="text-gray-900 block text-sm font-medium dark:text-white">
          Hình ảnh
        </span>
        <div className="mb-5 flex w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9b9b9b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
                <path d="M16 16l-4-4-4 4" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
                <span className="font-semibold">Click to upload</span>
                or drag and drop
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <button
          type="submit"
          className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg bg-lime-500 px-5 py-2.5 text-center text-sm font-medium text-slate-800 hover:bg-lime-800 focus:outline-none focus:ring-4"
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
          Thêm tài khoản mới
        </button>
      </form>
    </div>
  );
};

export default FormAddAccount;
