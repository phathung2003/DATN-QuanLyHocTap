import React from 'react';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  FormComponent: React.FC; // Nhận component form làm prop
}

const AddFormLayout: React.FC<AddModalProps> = ({
  isOpen,
  onClose,
  FormComponent,
}) => {
  if (!isOpen) return null;
  return (
    <div
      id="createProductModal"
      aria-hidden="true"
      className="fixed inset-0 z-9999 flex h-full w-full items-center justify-center bg-slate-800 bg-opacity-70"
    >
      <div className="relative max-h-full w-full max-w-2xl rounded-lg bg-white p-4 shadow dark:bg-slate-800 sm:p-5">
        <div className="mb-4 flex items-center justify-between rounded-t border-b border-slate-200 pb-4 dark:border-slate-600 sm:mb-5">
          <h3 className="text-gray-900 text-lg font-semibold dark:text-white">
            Thêm mới
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-gray-900 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm hover:bg-slate-200 dark:hover:bg-slate-600 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4a4a4a"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="bevel"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <FormComponent />
      </div>
    </div>
  );
};

export default AddFormLayout;
