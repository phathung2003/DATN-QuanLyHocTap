import React, { useState } from 'react';
import Image from 'next/image';

const AlphabetCard = ({ firstimage, firstword, secondimage, secondword }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`perspective m-2 h-64 w-96 bg-rose-100`}
      onClick={handleFlip}
    >
      <div
        className={`transform-style preserve-3d relative h-full w-full duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="backface-hidden absolute h-full w-full items-center justify-center text-4xl">
          {firstimage != null && (
            <Image
              className="h-48 w-96"
              width={380}
              height={200}
              src={firstimage}
              alt="image"
            />
          )}
          {firstword != null && (
            <p className="text-gray-900 mt-5 text-center text-2xl font-semibold dark:text-white">
              {firstword}
            </p>
          )}
        </div>

        <div className="rotate-y-180 backface-hidden absolute h-full w-full items-center justify-center text-2xl">
          {secondimage != null && (
            <Image
              className="h-48 w-96"
              width={380}
              height={200}
              src={secondimage}
              alt="image"
            />
          )}
          {secondword != null && (
            <p className="text-gray-900 mt-5 text-center text-2xl font-semibold dark:text-white">
              {secondword}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlphabetCard;
