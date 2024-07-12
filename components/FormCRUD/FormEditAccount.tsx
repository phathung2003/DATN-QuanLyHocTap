import React from 'react';

const FormEditAccount = () => {
  return (
    <div>
      <form action="#">
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Tài Khoản
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value="0798949793"
              className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              placeholder="079593993"
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="mb-2 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Người dùng
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              value="Nguyễn Minh"
              className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              placeholder="Nguyễn Minh"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Mật Khẩu
            </label>
            <input
              type="password"
              value="******"
              name="price"
              id="price"
              className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
              placeholder="******"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Vài trò
            </label>
            <select
              id="category"
              className="focus:ring-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-900 focus:border-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
            >
              <option selected value="">
                Admin
              </option>
              <option value="TV">Admin</option>
              <option value="PC">Phụ Huynh</option>
              <option value="GA">Người dùng</option>
              <option value="PH">Học sinh</option>
            </select>
          </div>
        </div>
        <span className="block text-sm font-medium text-slate-900 dark:text-white">
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
              <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-semibold">Click to upload</span>
                or drag and drop
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Cập nhật tài khoản
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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

export default FormEditAccount;
