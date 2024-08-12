/* eslint-disable */
//Icon
import EditIcon from '@/public/vector/pencil-white.svg';

interface EditButtonProperties {
  onClick: () => void;
}

interface EditButtonHandleEventProperties {
  onClick: (e) => void;
}

const EditButton: React.FC<
  EditButtonProperties | EditButtonHandleEventProperties
> = ({ onClick }) => {
  return (
    <button
      id="edit_Button"
      type="button"
      onClick={onClick}
      className="mr-4 flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
    >
      <EditIcon />
      Sửa
    </button>
  );
};

export default EditButton;
