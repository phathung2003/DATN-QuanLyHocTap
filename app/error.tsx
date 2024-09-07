'use client';

import React from 'react';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="bg-gray-100 flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-red-600 text-4xl font-bold">Something went wrong!</h1>
      <p className="text-gray-700 mt-4 text-lg">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
