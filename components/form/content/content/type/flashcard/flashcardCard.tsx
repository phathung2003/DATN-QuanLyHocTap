'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';

interface IFlashcardData {
  data: IFlashcardContent;
}

const FlashcardCard: React.FC<IFlashcardData> = ({ data }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div
      className={`perspective-1000 relative m-2 h-64 w-96 cursor-pointer `}
      onClick={handleFlip}
    >
      <div
        className={`transform-style preserve-3d relative h-full w-full duration-700 ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        <div
          id="firstSide"
          className="backface-hidden absolute h-full w-full items-center justify-center text-4xl "
        >
          {Card(data.firstSideImage, data.firstSideText)}
        </div>

        <div
          id="secondSide"
          className="rotate-y-180 backface-hidden absolute flex h-full w-full items-center justify-center text-2xl"
        >
          {Card(data.secondSideImage, data.secondSideText)}
        </div>
      </div>
    </div>
  );
};

export default FlashcardCard;

function Card(image, text) {
  return (
    <div
      className={`backface-hidden absolute h-full w-full items-center justify-center rounded-lg bg-slate-200 text-4xl dark:bg-slate-500 ${image == null || text == null ? 'flex' : ''}`}
    >
      {image != null && (
        <div
          className={`${text == null ? 'absolute inset-0 h-full w-full' : 'relative h-48 w-96'}`}
        >
          <Image
            src={image}
            fill
            priority
            alt="image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      <p className="text-gray-900 mt-5 text-center text-2xl font-semibold ">
        {text}
      </p>
    </div>
  );
}
