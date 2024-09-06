//Icon
import AddIcon from '@/public/vector/plus-white.svg';

interface AddSubmitButtonProperties {
  buttonName: string;
}

const AddSubmitButton: React.FC<AddSubmitButtonProperties> = ({
  buttonName,
}) => {
  return (
    <button
      id="addSubmit_Button"
      type="submit"
      className="ml-auto inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-lime-600 p-1.5 px-2 py-2 text-xs font-medium text-white hover:bg-lime-500 dark:hover:text-white min-[890px]:w-auto"
    >
      <AddIcon />
      {buttonName}
    </button>
  );
};

export default AddSubmitButton;
