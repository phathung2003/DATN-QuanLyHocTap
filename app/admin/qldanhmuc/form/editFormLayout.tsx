//Icon
import ExitIcon from '@/asset/vector/exit.svg';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  FormComponent;
}

const EditFormLayout: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  FormComponent,
}) => {
  if (!isOpen) return null;
  return (
    <div
      id="updateCategory"
      aria-hidden="true"
      className={`fixed inset-0 z-9999 flex h-full w-full items-center justify-center bg-slate-800 bg-opacity-20 md:inset-0 ${isOpen ? '' : 'hidden'}`}
    >
      <div className="relative max-h-full w-full max-w-2xl p-4">
        {/* Modal content */}
        <div className="relative rounded-lg bg-white p-4 shadow dark:bg-slate-800 sm:p-5">
          {/* Modal header */}
          <div className="mb-4 flex items-center justify-between rounded-t border-b border-slate-200 pb-4 dark:border-slate-600 sm:mb-5">
            <h3
              id="editCategoryHeader"
              className="text-lg font-semibold text-slate-900 dark:text-white"
            >
              Cập nhật
            </h3>
            <button
              type="button"
              id="exitEditCategory"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-slate-400 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-600 dark:hover:text-white"
              onClick={onClose}
            >
              <ExitIcon className="h-5 w-5" />
              <span className="sr-only" />
            </button>
          </div>

          {/* Form */}
          <div>{FormComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default EditFormLayout;
