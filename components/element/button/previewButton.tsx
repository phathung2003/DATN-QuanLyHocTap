/*eslint-disable*/
//Icon
import SeeIcon from '@/public/vector/eye.svg';

interface PreviewButtonProperties {
  onClick: (e) => void;
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
      className="inline-flex w-max items-center justify-center gap-2.5 rounded-lg bg-yellow-600 px-2 py-2 text-sm text-white hover:bg-yellow-700"
      onClick={onClick}
    >
      <SeeIcon className="stroke-curren fill-current" />
      {buttonName}
    </button>
  );
};

export default PreviewButton;
