import React from 'react';

const addQuestionForm = () => {
  return (
    <div>
      <form action="#">
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Mô tả câu hỏi: <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="text-gray-900 dark:placeholder-gray-400 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
              placeholder="Điền vào mô tả..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Chọn loại
            </label>
            <select
              id="category"
              className="text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            >
              <option value="">Chọn loại câu hỏi</option>
              <option value="TV">Flashcard</option>
              <option value="PC">Điền từ</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="brand"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Từ mặt trước
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Điền vào từ mặt trước..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Từ mặt sau
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Điền vào từ mặt sau..."
              required
            />
          </div>
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
          Thêm câu mới
        </button>
      </form>
    </div>
  );
};

export default addQuestionForm;
