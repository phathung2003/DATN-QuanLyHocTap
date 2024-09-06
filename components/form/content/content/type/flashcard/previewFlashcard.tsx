'use client';
import React, { useState } from 'react';
import FlashcardCard from '@/components/form/content/content/type/flashcard/flashcardCard';
import { IContentList } from '@/backend/models/data/Content/IContent';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';

//Icon
import ArrowIcon from '@/public/vector/dropdown-black.svg';

interface IContentData {
  content: IContentList;
}

const PreviewFlashcard: React.FC<IContentData> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (content.contentData?.length == 0)
    return (
      <p className="flex h-full w-full items-center justify-center text-lg font-bold">
        <p> Chưa có nội dung</p>
      </p>
    );

  const flashcardList = content.contentData as IFlashcardContent[];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flashcardList.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < flashcardList.length - 1 ? prevIndex + 1 : 0,
    );
  };

  return (
    <div>
      <div className="relative flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <FlashcardCard
            key={currentIndex}
            data={flashcardList[currentIndex]}
          />

          {/* Nút điều hướng */}
          <button
            onClick={handlePrevious}
            className="bg-gray-800 absolute left-5 top-1/2 -translate-y-1/2 transform rounded-full p-2 text-white"
          >
            <div className='className="m-4 hover:bg-slate-400" rounded-full bg-slate-300 p-2'>
              <ArrowIcon className="rotate-90 fill-black" />
            </div>
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-800 absolute right-5 top-1/2 -translate-y-1/2 transform rounded-full p-2 text-white"
          >
            <div className='className="m-4 hover:bg-slate-400" rounded-full bg-slate-300 p-2'>
              <ArrowIcon className="-rotate-90 fill-black" />
            </div>
          </button>
        </div>
      </div>

      <div>
        {/* Số thứ tự */}
        <div className="flex w-full items-center justify-center">
          <span className="text-gray-900 text-xl font-semibold">
            {currentIndex + 1} / {flashcardList.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewFlashcard;
