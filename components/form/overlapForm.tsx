import React from 'react';

//Icon
import ExitIcon from '@/public/vector/exit.svg';
export default function OverlapForm(
  isModalOpen,
  setIsModalOpen,
  currentForm,
  modalHeader: string,
) {
  return (
    <div>
      {isModalOpen && (
        <OverlapFormLayout
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          FormComponent={currentForm}
          formHeader={modalHeader}
        />
      )}
    </div>
  );
}

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
      id="modal"
      aria-hidden="true"
      className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-800 bg-opacity-70"
    >
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-4 shadow dark:bg-slate-800 sm:p-5">
        <div className="mb-2 flex items-center justify-between rounded-t border-b border-slate-200 pb-2 dark:border-slate-600 sm:mb-2">
          <h3
            id="formHeader"
            className="text-gray-900 text-lg font-semibold dark:text-white"
          >
            {formHeader}
          </h3>
          <button
            id="exitButton"
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-slate-200 dark:hover:bg-slate-600 "
          >
            <ExitIcon />
          </button>
        </div>

        <div className="relative max-h-[85vh] overflow-auto pr-3">
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
