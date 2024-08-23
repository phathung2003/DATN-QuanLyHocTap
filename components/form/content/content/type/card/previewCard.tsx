'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { IContentList } from '@/backend/models/data/Content/IContent';

//Icon
import ArrowIcon from '@/public/vector/dropdown-black.svg';

interface IContentData {
  content: IContentList;
}

const PreviewCard: React.FC<IContentData> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (content.contentData?.length == 0)
    return (
      <p className="flex h-64 w-full items-center justify-center text-lg font-bold">
        Chưa có nội dung
      </p>
    );
  const cardList = content.contentData as ICardContent[];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : cardList.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < cardList.length - 1 ? prevIndex + 1 : 0,
    );
  };

  return (
    <div>
      <div className="relative flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {Card(cardList[currentIndex])}

          {/* Nút điều hướng */}
          <button
            onClick={handlePrevious}
            className="bg-gray-800 absolute left-5 top-1/2 -translate-y-1/2 transform rounded-full p-2 text-white"
          >
            <div className='hover:bg-slate-400" m-4 rounded-full bg-slate-300 p-2'>
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
            {currentIndex + 1} / {cardList.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;

function Card(data: ICardContent) {
  return (
    <div className="relative m-2 h-64 w-96 cursor-pointer">
      <div
        className={`absolute h-full w-full items-center justify-center rounded-lg bg-slate-200 text-4xl dark:bg-slate-500 ${data.image == null || data.text == null || data.text == '' ? 'flex' : ''}`}
      >
        {data.image != null && (
          <div
            className={`${data.text == null || data.text == '' ? 'absolute inset-0 h-full w-full' : 'relative h-48 w-96'}`}
          >
            <Image
              src={data.image}
              fill
              priority
              alt="image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'contain' }} // set vầy để hình nó vừa khung không bị bóp méo thay vì dùng style={{ objectFit: 'fill' }}
            />
          </div>
        )}
        <p className="mt-5 text-center text-2xl font-semibold ">{data.text}</p>
      </div>
    </div>
  );
}
