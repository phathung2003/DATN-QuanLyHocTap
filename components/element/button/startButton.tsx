/* eslint-disable */
interface StartButtonProperties {
  onClick: () => void;
  buttonName: string;
}

//eslint-disabled-next-line
interface StartButtonHaveEventProperties {
  onClick: (e) => void;
  buttonName: string;
}

const StartButton: React.FC<
  StartButtonProperties | StartButtonHaveEventProperties
> = ({ onClick, buttonName }) => {
  return (
    <button
      id="start_Button"
      type="button"
      className="hover:bg-blue-60 mt-2 rounded bg-blue-500 p-3 text-white"
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default StartButton;
