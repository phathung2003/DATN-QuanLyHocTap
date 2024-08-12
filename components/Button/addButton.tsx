/* eslint-disable */
//Icon
import AddIcon from '@/public/vector/plus-white.svg';

interface AddButtonProperties {
  onClick: () => void;
  buttonName: string;
}

//eslint-disabled-next-line
interface AddButtonHaveEventProperties {
  onClick: (e) => void;
  buttonName: string;
}

const AddButton: React.FC<
  AddButtonProperties | AddButtonHaveEventProperties
> = ({ onClick, buttonName }) => {
  return (
    <button
      id="add_Button"
      type="button"
      className="ml-auto inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-lime-600 p-1.5 px-2 py-2 text-sm text-white hover:bg-lime-500 dark:hover:text-white min-[890px]:w-auto"
      onClick={onClick}
    >
      <AddIcon />
      {buttonName}
    </button>
  );
};

export default AddButton;
