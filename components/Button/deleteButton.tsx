//Icon
import DeleteIcon from '@/public/vector/trashcan-red.svg';

interface DeleteButtonProperties {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProperties> = ({ onClick }) => {
  return (
    <button
      id="delete_Button"
      type="button"
      className="focus:ring-red-300 dark:hover:bg-red-600 dark:focus:ring-red-900 mr-4 flex items-center gap-2 rounded-lg border border-rose-600 px-3 py-2 text-center text-sm font-medium text-rose-600 hover:bg-rose-800 hover:stroke-white hover:text-white focus:outline-none focus:ring-4 dark:border-rose-500 dark:text-rose-500 dark:hover:text-white"
      onClick={onClick}
    >
      <DeleteIcon className="text-red-700 dark:text-red-500 w-[24px] stroke-current hover:text-white dark:hover:text-white" />
      Xóa
    </button>
  );
};

export default DeleteButton;
