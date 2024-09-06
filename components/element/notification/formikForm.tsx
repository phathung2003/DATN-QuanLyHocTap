import React from 'react';
import { ErrorMessage } from 'formik';

const FormikShowError = ({ type, filedName, errorMessage }) => {
  return (
    <div className="my-2 text-sm font-semibold text-rose-600 dark:text-rose-300">
      <p id={`${filedName}_${type}Error`}>{errorMessage}</p>

      <ErrorMessage id={`${filedName}_${type}Error`} name={filedName} />
    </div>
  );
};

export default FormikShowError;
