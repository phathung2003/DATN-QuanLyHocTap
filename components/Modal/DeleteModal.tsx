import React from 'react'

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

const DeleteModal: React.FC<ProductModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  return (
    <div id="deleteModal" aria-hidden="true" className="fixed inset-0 z-9999 flex justify-center items-center w-full h-full bg-slate-800 bg-opacity-20 md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-slate-800 sm:p-5">
            <button onClick={() => onClose()} type="button" className="text-slate-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white" data-modal-toggle="deleteModal">
            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <svg className="mb-3.5 mx-auto" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d0021b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            <p className="mb-4 text-slate-500 dark:text-slate-300">Bạn có chắc chắn muốn xóa không ?</p>
            <div className="flex justify-center items-center space-x-4">
                <button onClick={() => onClose()} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-slate-500 bg-white rounded-lg border border-slate-200 hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-600">Hủy bỏ</button>
                <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-rose-600 rounded-lg hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-900">Chắc chắn</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default DeleteModal