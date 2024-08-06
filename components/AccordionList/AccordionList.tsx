// Accordion.js
/*eslint-disable*/
import React from 'react';
import { useState } from 'react';
import DropdownIcon from '@/public/vector/down-list-content.svg';
import PreviewIcon from '@/public/vector/preview.svg';
import FormFlashCard from '@/components/FormCRUD/FormLession';
import AddModal from '@/components/Modal/AddModal';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState([
    { title: 'Đếm các chữ số từ 1 - 5', type: 'Flashcard' },
    { title: 'Ôn tập flascard các số từ 1 - 5', type: 'Card' },
    { title: 'Học đếm các số từ 6 - 10', type: 'Card' },
  ]);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  // state for modal flashcard || card || tính toán
  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
  const [currentFormComponent, setCurrentFormComponent] = useState<React.FC>(
    () => FormFlashCard,
  );
  const handleOpenLearningModal = (FormComponent: React.FC) => {
    setCurrentFormComponent(() => FormComponent);
    setIsLearningModalOpen(true);
  };

  return (
    <div className="w-full">
      <div className="dark:bg-dark border-b border-slate-200 dark:border-none">
        {items.map((item, index) => (
          <div key={index}>
            <div className="mb-5 flex w-full justify-between rounded-lg bg-slate-200 px-6 py-4 text-left hover:bg-slate-300 focus:outline-none dark:bg-slate-700">
              <button type="button" onClick={() => handleToggle(index)}>
                <h2 className="text-lg font-semibold">{item.title}</h2>
              </button>
              <div className="flex content-center justify-end space-x-4">
                {/* button xem trước (preview)*/}
                <button
                  type="button"
                  onClick={() => handleOpenLearningModal(FormFlashCard)}
                  className="mb-2 me-2 rounded-lg bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800"
                >
                  <PreviewIcon />
                </button>

                {/* showing modal xem trước flashcard */}
                {item.type === 'Flashcard' &&
                  isLearningModalOpen &&
                  currentFormComponent && (
                    <AddModal
                      isOpen={isLearningModalOpen}
                      onClose={() => setIsLearningModalOpen(false)}
                      FormComponent={currentFormComponent}
                    />
                  )}

                {/* button chỉnh sửa */}
                <button
                  type="button"
                  className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Chỉnh sửa
                </button>
                {/* button dropdown */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="mb-2 me-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-2.5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <DropdownIcon />
                </button>
              </div>
            </div>

            {/* content xả xuống */}
            <div
              className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-screen' : 'max-h-0'}`}
            >
              <div className="bg-white px-6 py-4 dark:bg-black">
                <p>
                  Loại:
                  <strong className="ml-2">{item.type}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
