//Icon
import AddIcon from '@/public/vector/plus-white.svg';

interface PreviewButtonProperties {
  onClick: () => void;
  buttonName: string;
}

const PreviewButton: React.FC<PreviewButtonProperties> = ({
  onClick,
  buttonName,
}) => {
  return (
    <button
      id="preview_Button"
      type="button"
      className="ml-auto inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-rose-400 p-1.5 px-2 py-2 text-xs font-medium text-white hover:bg-rose-400/80 dark:hover:text-white min-[890px]:w-auto"
      onClick={onClick}
    >
      <AddIcon />
      {buttonName}
    </button>
  );
};

export default PreviewButton;
