interface SubmitButtonProperties {
  buttonName: string;
}

const SubmitButton: React.FC<SubmitButtonProperties> = ({ buttonName }) => {
  return (
    <button
      id="submit_Button"
      type="submit"
      className="focus:ring-primary-300 dark:focus:ring-primary-800 rounded-lg bg-blue-700 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 dark:bg-blue-600 dark:hover:bg-blue-700"
    >
      {buttonName}
    </button>
  );
};

export default SubmitButton;
