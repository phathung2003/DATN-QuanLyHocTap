'use client';
import React, { useState } from 'react';

//Icon
import TrashCan from '@/public/vector/trashcan-red.svg';
import ExitButton from '@/public/vector/exit-bold.svg';

export default function DeleteForm(isModalOpen, setIsModalOpen, deleteAction) {
  return (
    <div>
      {isModalOpen && (
        <DeleteFormLayout
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={deleteAction}
        />
      )}
    </div>
  );
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

const DeleteFormLayout: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  const [deleteStart, setDeleteStarted] = useState(false);
  const MessageForm = !deleteStart ? WarningMessage() : DeleteInProcess();
  if (!isOpen) return null;

  return (
    <div
      id="deleteModal"
      aria-hidden="true"
      className="fixed inset-0 z-9999  flex h-full max-h-full w-full items-center justify-center bg-slate-800 bg-opacity-20 md:inset-0"
    >
      <div className="relative w-full max-w-md p-4">
        {/* <!-- Modal content --> */}

        <div className="relative rounded-lg bg-white p-4 text-center shadow dark:bg-slate-800 sm:p-5">
          <button
            onClick={() => onClose()}
            id="closeDeleteModal"
            type="button"
            className="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-slate-400 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
          >
            <ExitButton className="h-5 w-5" />
            <span className="sr-only">Close modal</span>
          </button>

          <TrashCan className="mx-auto mb-4" />
          {MessageForm}

          {!deleteStart && (
            <div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  id="closeDeleteModal"
                  onClick={() => onClose()}
                  data-modal-toggle="deleteModal"
                  type="button"
                  className="focus:ring-primary-300 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:z-10 focus:outline-none focus:ring-4 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-600"
                >
                  Hủy bỏ
                </button>

                <button
                  id="deleteAcceptedButton"
                  type="button"
                  onClick={async () => {
                    setDeleteStarted(true);
                    await onDelete();
                    onClose();
                  }}
                  className="rounded-lg bg-rose-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-900"
                >
                  Chắc chắn
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WarningMessage = () => {
  return (
    <div>
      <p className="mb-4 text-slate-500 dark:text-slate-300">
        Bạn có chắc chắn muốn xóa không ?
      </p>
      <p className="mb-4 text-slate-500 dark:text-slate-300">
        Dữ liệu sau khi xóa sẽ không khôi phục lại được !
      </p>
    </div>
  );
};

const DeleteInProcess = () => {
  return (
    <div>
      <p className="mb-4 text-slate-500 dark:text-slate-300">
        Đang tiến hành xóa dữ liệu
      </p>
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-blue-500 border-t-transparent" />
      <p className=" text-slate-500 dark:text-slate-300">
        Vui lòng đợi hoàn tất
        <span className="dots" />
      </p>
    </div>
  );
};
