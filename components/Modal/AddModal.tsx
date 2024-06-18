
import React from 'react';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  FormComponent: React.FC; // Nhận component form làm prop
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, FormComponent }) => {
  if (!isOpen) return null;  
  return (
    <div id="createProductModal" aria-hidden="true" className="fixed inset-0 z-9999 flex justify-center items-center w-full h-full bg-slate-800 bg-opacity-70">
      <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-slate-800 sm:p-5">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b border-slate-200 sm:mb-5 dark:border-slate-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thêm mới</h3>
          <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-slate-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="2" stroke-linecap="square" stroke-linejoin="bevel"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <FormComponent />
      </div>
    </div>
  );
};

export default AddModal;
