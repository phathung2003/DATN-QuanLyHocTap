import React from 'react';
import { useState } from 'react';
import AlphabetCard from '@/components/AlphabetCard/AlphabetCard';

const FormLession = () => {
  const alphabetData = [
    { image: '/images/lesson/alphabetLesson/lettera.jpg', word: 'Apple' },
    { image: '/images/lesson/alphabetLesson/lettera.jpg', word: 'Banana' },
    { image: '/images/lesson/alphabetLesson/lettera.jpg', word: 'Cat' },
    // Thêm các chữ cái khác nếu cần
  ];

  // nút điều khiển trái phải
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : alphabetData.length - 1,
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < alphabetData.length - 1 ? prevIndex + 1 : 0,
    );
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-auto bg-slate-100">
      {/* alphabet learning */}
      <div className="flex items-center">
        <button
          onClick={handlePrev}
          className="m-4 rounded-full bg-slate-300 p-2 hover:bg-slate-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <AlphabetCard
          image={alphabetData[currentIndex].image}
          word={alphabetData[currentIndex].word}
        />
        <button
          onClick={handleNext}
          className="m-4 rounded-full bg-slate-300 p-2 hover:bg-slate-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FormLession;
