import React from 'react';
import { useState } from 'react';
import AlphabetCard from '@/components/AlphabetCard/AlphabetCard';

const FormLession = () => {
  const alphabetData = [
    {
      firstimage: '/images/lesson/number/number01.png',
      firstword: 'Số 01',
      secondimage: '/images/lesson/number/number02.png',
      secondword: 'Số 02',
    },
    {
      firstimage: '/images/lesson/number/number03.png',
      firstword: 'Số 03',
      secondimage: '/images/lesson/number/number04.png',
      secondword: 'Số 04',
    },
    {
      firstimage: null,
      firstword: 'Số 05',
      secondimage: '/images/lesson/number/number04.png',
      secondword: null,
    },
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
    <div className="flex flex-col">
      {/* alphabet learning */}
      <div className="flex flex-col items-center justify-center">
        <AlphabetCard
          firstimage={alphabetData[currentIndex].firstimage}
          firstword={alphabetData[currentIndex].firstword}
          secondimage={alphabetData[currentIndex].secondimage}
          secondword={alphabetData[currentIndex].secondword}
        />
        {/* button điều khiển phải trái */}
        <div className="flex">
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
    </div>
  );
};

export default FormLession;
