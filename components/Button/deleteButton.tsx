/* eslint-disable */
//Icon
import DeleteIcon from '@/public/vector/trashcan-red.svg';

interface DeleteButtonProperties {
  onClick: () => void;
}

//eslint-disabled-next-line
interface DeleteButtonHaveEventProperties {
  onClick: (e) => void;
}

const DeleteButton: React.FC<
  DeleteButtonProperties | DeleteButtonHaveEventProperties
> = ({ onClick }) => {
  return (
    <button
      id="delete_Button"
      type="button"
      className="flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-0.5 text-center text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-900"
      onClick={onClick}
    >
      <DeleteIcon className="text-red-700 dark:text-red-500 w-[24px] stroke-current hover:text-white dark:hover:text-white" />
      Xóa
    </button>
  );
};

export default DeleteButton;
