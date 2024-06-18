import React from 'react'

const FormEditCate = () => {
  return (
    <div>
        <form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Tên danh mục</label>
                    <input type="text" name="name" id="name" value="Môn Toán" className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Môn Toán" />
                </div>
                <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Vài trò</label>
			        <select id="category" className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-primary-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
				        <option selected value="">Môn học</option>
				        <option value="TV">Môn học</option>
				        <option value="PC">Cấp độ</option>
			        </select>
			    </div>
                <div>
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Mô tả</label>
                    <input type="text" value="Toán dành cho tiểu học" name="price" id="price" className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Toán dành cho tiểu học" />
                </div>                
            </div>
            <span className="block text-sm font-medium text-slate-900 dark:text-white">Hình ảnh</span>
          	<div className="flex justify-center items-center w-full mb-5">
                        <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-slate-50 rounded-lg border-2 border-slate-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                            <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9b9b9b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21"/><path d="M16 16l-4-4-4 4"/></svg>
                                <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="font-semibold">Click to upload</span>
                                    or drag and drop
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden"/>
                        </label>
            </div>
            <div className="flex items-center space-x-4">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Cập nhật</button>
                    <button type="button" className="text-rose-600 inline-flex items-center hover:text-white border border-rose-600 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-rose-500 dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-rose-900">
                        <svg className="stroke-current text-rose-700 dark:text-rose-500 hover:text-white dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d01d02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        Xóa
                    </button>
            </div>
        </form>
    </div>
  )
}

export default FormEditCate