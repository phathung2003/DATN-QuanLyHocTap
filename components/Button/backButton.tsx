//Icon
import DropdownIcon from '@/public/vector/down-list-content.svg';

const BackButton: React.FC = () => {
  return (
    <button
      className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      onClick={() => window.history.back()}
    >
      <DropdownIcon className="rotate-90" />
      Quay lại
    </button>
  );
};

export default BackButton;
