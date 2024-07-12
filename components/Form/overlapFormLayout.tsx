import React from 'react';

//Icon
import ExitIcon from '@/public/vector/exit.svg';

interface FormModalProperties {
  isOpen: boolean;
  onClose: () => void;
  FormComponent;
  formHeader: string;
}

const OverlapFormLayout: React.FC<FormModalProperties> = ({
  isOpen,
  onClose,
  FormComponent,
  formHeader,
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
            {formHeader}
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-gray-900 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm hover:bg-slate-200 dark:hover:bg-slate-600 dark:hover:text-white"
          >
            <ExitIcon />
          </button>
        </div>

        <div>
          {typeof FormComponent === 'function' ? (
            <FormComponent />
          ) : (
            <>{FormComponent}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverlapFormLayout;
