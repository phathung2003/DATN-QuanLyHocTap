import React from 'react';
import { useState } from 'react';
import DropdownIcon from '@/public/vector/down-list-content.svg';
import { IContentList } from '@/backend/models/data/Content/IContent';
import { ToTitleCase } from '@/backend/database/generalFeature';
import { ContentType } from '@/backend/globalVariable';
import Image from 'next/image';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';

interface ContentFormProps {
  data: IContentList;
}

const Accordion: React.FC<ContentFormProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(true);

  const handleToggle = () => {
    setActiveIndex(!activeIndex);
  };

  const contentRender = () => {
    switch (data.contentType.toUpperCase()) {
      case ContentType.FLASHCARD:
        return Flashcard(data);
      case ContentType.CARD:
        return Card(data);
      case ContentType.CALCULATE_TWO_NUMBER:
        return CalculateTwoNumber(data);
      default:
        return (
          <p className="flex w-full justify-center text-lg font-bold">
            Nội dung không hỗ trợ
          </p>
        );
    }
  };

  return (
    <div className="dark:bg-dark border-b border-slate-200 dark:border-none">
      <div className="flex w-full justify-between rounded-lg bg-slate-200 px-6 py-4 text-left hover:bg-slate-300 focus:outline-none dark:bg-slate-700">
        <button type="button" onClick={() => handleToggle()}>
          <div className="relative text-left">
            <h2 className="text-lg font-semibold">{data.contentName}</h2>
            <h1>{data.contentDescription}</h1>
            <h1>Loại: {ToTitleCase(data.contentType)}</h1>
          </div>
        </button>

        <div className="flex space-x-4">
          {/* button chỉnh sửa */}
          <button
            type="button"
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Xem trước
          </button>
          <button
            type="button"
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Chỉnh sửa
          </button>

          {/* button thêm nội dung */}
          <button
            type="button"
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Thêm nội dung
          </button>
          {/* button dropdown */}
          <button
            type="button"
            onClick={() => handleToggle()}
            className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-2.5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <DropdownIcon />
          </button>
        </div>
      </div>

      {/* content xả xuống */}

      <div
        className={`mt-2 transition-all duration-300 ${activeIndex ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}
      >
        <div className="relative w-full justify-start">{contentRender()}</div>
      </div>
    </div>
  );
};

export default Accordion;

function Flashcard(data: IContentList) {
  if (data.contentData == null)
    return (
      <p className="flex w-full justify-center text-lg font-bold">
        Chưa có nội dung
      </p>
    );

  const flashcard = data.contentData as IFlashcardContent[];
  const defaultPicture = process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE;
  return (
    <div>
      <table id="table" className="w-full">
        <thead className="text-gray-400 sticky top-0 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
          <tr>
            <th id="idHead" className="w-[5rem] text-center">
              STT
            </th>
            <th id="nameHead" className="w-[9rem] px-4 py-3 text-center">
              Hình mặt trước
            </th>
            <th id="subjectHead" className="w-[12rem] px-4 py-3">
              Chữ mặt trước
            </th>
            <th id="gradeHead" className="w-[9rem] px-4 py-3 text-center">
              Hình mặt sau
            </th>
            <th id="gradeHead" className="w-[12rem] px-4 py-3">
              Chữ mặt sau
            </th>
            <th id="managerOptionHead" className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody className="h-[50px] items-center divide-y">
          {flashcard
            .sort((a, b) => a.position - b.position)
            .map((flashcardData) => (
              <tr
                key={flashcardData.position}
                className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                <td id="gradeID" className="w-[30px] text-center">
                  {flashcardData.position}
                </td>

                <td id="gradeID" className="h-[9rem] w-[9rem] px-4">
                  <Image
                    src={flashcardData.firstSideImage ?? defaultPicture}
                    alt="firstSideImage"
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </td>
                <td id="name" className="px-4">
                  {flashcardData.firstSideText}
                </td>
                <td id="subject" className="h-[9rem] w-[9rem] px-4">
                  <Image
                    src={flashcardData.secondSideImage ?? defaultPicture}
                    alt="secondSideImage"
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </td>
                <td id="subject" className="px-4">
                  {flashcardData.firstSideText}
                </td>

                <td>
                  <div
                    id="managerOption"
                    className="flex items-center justify-end py-3"
                  >
                    <button
                      type="button"
                      className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      type="button"
                      className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function Card(data: IContentList) {
  if (data.contentData == null)
    return (
      <p className="flex w-full justify-center text-lg font-bold">
        Chưa có nội dung
      </p>
    );

  const card = data.contentData as ICardContent[];
  const defaultPicture = process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE;
  return (
    <div>
      <table id="table" className="w-full">
        <thead className="text-gray-400 sticky top-0 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
          <tr>
            <th id="idHead" className="w-[5rem] text-center">
              STT
            </th>
            <th id="nameHead" className="w-[9rem] px-4 py-3 text-center">
              Hình
            </th>
            <th id="subjectHead" className="w-[12rem] px-4 py-3">
              Chữ
            </th>
            <th id="managerOptionHead" className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody className="h-[50px] items-center divide-y">
          {card
            .sort((a, b) => a.position - b.position)
            .map((cardData) => (
              <tr
                key={cardData.position}
                className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                <td id="gradeID" className="w-[30px] text-center">
                  {cardData.position}
                </td>
                <td id="gradeID" className="h-[9rem] w-[9rem] px-4">
                  <Image
                    src={cardData.image ?? defaultPicture}
                    alt="image"
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </td>
                <td id="name" className="px-4">
                  {cardData.text}
                </td>

                <td>
                  <div
                    id="managerOption"
                    className="flex items-center justify-end py-3"
                  >
                    <button
                      type="button"
                      className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      type="button"
                      className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function CalculateTwoNumber(data: IContentList) {
  if (data.contentData == null)
    return (
      <p className="flex w-full justify-center text-lg font-bold">
        Chưa có nội dung
      </p>
    );

  const math = data.contentData as ICalculateTwoNumbersContent[];

  return (
    <div>
      <table id="table" className="w-full">
        <thead className="text-gray-400 sticky top-0 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
          <tr>
            <th id="idHead" className="w-[5rem] text-center">
              STT
            </th>
            <th id="nameHead" className="w-[9rem] px-4 py-3 text-center">
              Phép tính
            </th>
            <th id="managerOptionHead" className="px-4 py-3"></th>
          </tr>
        </thead>

        <tbody className="h-[50px] items-center divide-y">
          {math
            .sort((a, b) => a.position - b.position)
            .map((mathData) => (
              <tr
                key={mathData.position}
                className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                <td id="gradeID" className="w-[30px] text-center">
                  {mathData.position}
                </td>
                <td id="gradeID" className="w-[30px] text-center">
                  {mathData.firstNumber} {mathData.operator}{' '}
                  {mathData.secondNumber}
                </td>

                <td>
                  <div
                    id="managerOption"
                    className="flex items-center justify-end py-3"
                  >
                    <button
                      type="button"
                      className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      type="button"
                      className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
