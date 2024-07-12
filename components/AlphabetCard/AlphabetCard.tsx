import React, { useState } from 'react';
import Image from 'next/image';

const AlphabetCard = ({ image, word }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`perspective m-4 h-64 w-96`} onClick={handleFlip}>
      <div
        className={`transform-style preserve-3d relative h-full w-full duration-700 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="backface-hidden absolute flex h-full w-full items-center justify-center bg-rose-300 text-4xl text-white">
          <Image width={500} height={320} src={image} alt="image" />
        </div>
        <div className="rotate-y-180 backface-hidden absolute flex h-full w-full items-center justify-center bg-green-500 text-2xl text-white">
          {word}
        </div>
      </div>
    </div>
  );
};

export default AlphabetCard;
