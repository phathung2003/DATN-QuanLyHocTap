import React from 'react';

const FormAddCate: React.FC = () => {
  return (
    <div>
        <form action="#">
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên danh mục: <span className="text-rose-600">*</span></label>
              <input type="text" name="name" id="name" className="bg-slate-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-lime-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-blue-500" placeholder="Điền vào danh mục..." required />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Thuộc</label>
              <select id="category" className="bg-slate-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="">Chọn</option>
                <option value="TV">Môn học</option>
                <option value="PC">Cấp độ</option>
              </select>
            </div>    
            <div>
              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả</label>
              <input type="text" name="brand" id="brand" className="bg-slate-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Điền vào mô tả..." required />
            </div>            
          </div>
          
          <span className="block text-sm font-medium text-gray-900 dark:text-white">Hình ảnh: <span className="text-rose-600">*</span></span>
          <div className="flex justify-center items-center w-full mb-5">
                        <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-slate-50 rounded-lg border-2 border-slate-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21"/><path d="M16 16l-4-4-4 4"/></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span>
                                    or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden"/>
                        </label>
          </div>
          
          <button type="submit" className="text-slate-800 inline-flex items-center bg-lime-500 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Thêm danh mục mới
          </button>
        </form>
    </div>
  )
};

export default FormAddCate;