// import React from 'react';

// // Định nghĩa kiểu Account
// interface Account {
//   id: number;
//   image: string;
//   phoneNumber: string;
//   user: string;
//   role: string;
// }

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  FormComponent: React.FC; // Nhận component form làm prop
}

const EditModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  FormComponent,
}) => {
  if (!isOpen) return null;
  return (
    <div
      id="updateProductModal"
      aria-hidden="true"
      className={`fixed inset-0 z-9999 flex h-[calc(100%-1rem)] h-full max-h-full w-full items-center justify-center bg-slate-800 bg-opacity-20 md:inset-0 ${isOpen ? '' : 'hidden'}`}
    >
      <div className="relative max-h-full w-full max-w-2xl p-4">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white p-4 shadow dark:bg-slate-800 sm:p-5">
          {/* Modal header */}
          <div className="mb-4 flex items-center justify-between rounded-t border-b border-slate-200 pb-4 dark:border-slate-600 sm:mb-5">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Cập nhật
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-slate-400 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
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
          </div>

          {/* Form */}
          <FormComponent />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
