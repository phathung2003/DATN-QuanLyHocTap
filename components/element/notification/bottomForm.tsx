import React from 'react';

const BottomFormError = ({ type, errorMessage }) => {
  return (
    <div className="mb-2 text-sm font-semibold text-rose-600 dark:text-rose-300">
      <p id={`${type}Error`}>{errorMessage}</p>
    </div>
  );
};

export default BottomFormError;
