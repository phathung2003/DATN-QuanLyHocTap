import React from 'react';
import { useState } from 'react';
import { IContentList } from '@/backend/models/data/Content/IContent';
import { ToTitleCase } from '@/backend/database/generalFeature';
import { ContentType } from '@/backend/globalVariable';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';
import { DeleteContent } from '@/backend/feature/content';

//Form
import EditContentForm from '@/components/form/content/content/editContentForm';
import AddFlashcardForm from '@/components/form/content/content/type/flashcard/addFlashcardForm';
import AddCardForm from '@/components/form/content/content/type/card/addCardForm';
import AddCalculateTwoNumberForm from '@/components/form/content/content/type/calculateTwoNumber/addCalculateTwoNumberForm';
import DeleteForm from '@/components/form/deleteModal';
import OverlapForm from '@/components/form/overlapForm';

//Page
import Flashcard from '@/components/page/content/content/type/flashcard';
import Card from '@/components/page/content/content/type/card';
import CalculateTwoNumber from '@/components/page/content/content/type/calculateTwoNumber';

//Button - Icon
import AddButton from '@/components/element/button/addButton';
import DeleteButton from '@/components/element/button/deleteButton';
import EditButton from '@/components/element/button/editButton';
import DropdownIcon from '@/public/vector/down-list-content.svg';

interface ContentFormProps {
  courseID: string;
  unitID: string;
  taskID: string;
  contentID: string;
  data: IContentList;
}

interface ContentProperties {
  courseID: string;
  unitID: string;
  taskID: string;
  contentID: string;
  data?: IFlashcardContent | IContentList;
}

const ContentList: React.FC<ContentFormProps> = ({
  courseID,
  unitID,
  taskID,
  contentID,
  data,
}) => {
  const [activeIndex, setActiveIndex] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm nội dung bài học');
  const [currentForm, setCurrentForm] = useState<React.FC>(
    () => AddFlashcardForm,
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteFunction, setDeleteFunction] = useState<() => Promise<void>>(
    () => async () => {},
  );

  //Thu danh sách
  const handleToggle = () => {
    setActiveIndex(!activeIndex);
  };

  // Add Content Form
  const handleOpenAddModal = (FormComponent: React.FC<ContentProperties>) => {
    const WrappedFormComponent = () => (
      <FormComponent
        courseID={courseID}
        unitID={unitID}
        taskID={taskID}
        contentID={contentID}
      />
    );
    setCurrentForm(() => WrappedFormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm nội dung bài học');
  };

  //Edit Content Form
  const handleOpenEditModal = (
    FormComponent: React.FC<ContentProperties>,
    contentData,
  ) => {
    setCurrentForm(() => (
      <FormComponent
        courseID={courseID}
        unitID={unitID}
        taskID={taskID}
        contentID={contentID}
        data={contentData}
      />
    ));
    setIsModalOpen(true);
    setModalHeader('Chỉnh sửa nội dung bài học');
  };

  //Delete Form
  const handleDelete = (func: () => Promise<void>) => {
    setIsDeleteModalOpen(true);
    setDeleteFunction(() => func);
  };

  let addForm = AddFlashcardForm;
  const contentRender = () => {
    switch (data.contentType.toUpperCase()) {
      case ContentType.FLASHCARD:
        addForm = AddFlashcardForm;
        return Flashcard(
          data,
          handleDelete,
          handleOpenEditModal,
          courseID,
          unitID,
          taskID,
          contentID,
        );
      case ContentType.CARD:
        addForm = AddCardForm;
        return Card(
          data,
          handleDelete,
          handleOpenEditModal,
          courseID,
          unitID,
          taskID,
          contentID,
        );
      case ContentType.CALCULATE_TWO_NUMBER:
        addForm = AddCalculateTwoNumberForm;
        return CalculateTwoNumber(
          data,
          handleDelete,
          handleOpenEditModal,
          courseID,
          unitID,
          taskID,
          contentID,
        );
      default:
        return (
          <p className="flex w-full justify-center text-lg font-bold">
            Nội dung không hỗ trợ
          </p>
        );
    }
  };

  return (
    <div className="dark:bg-dark border-b border-slate-200 dark:border-none ">
      <div
        className="flex w-full items-center justify-between rounded-lg bg-slate-200 px-3 py-2 text-left hover:bg-slate-300 focus:outline-none dark:bg-slate-700"
        onClick={() => handleToggle()}
      >
        <div>
          <div className="relative text-left">
            <h2 className="text-lg font-semibold">
              {data.contentName == 'null'
                ? 'Không tiêu đề'
                : data.contentName ?? 'Không tiêu đề'}
            </h2>
            <h1>{data.contentDescription}</h1>
            <h1>
              Loại:{' '}
              {data.contentType == ContentType.CALCULATE_TWO_NUMBER
                ? ToTitleCase('Tính toán 2 số')
                : ToTitleCase(data.contentType)}
            </h1>
          </div>
        </div>

        <div className="flex-none">
          <div className="me-2 flex items-center justify-center space-x-4">
            <AddButton
              onClick={(e) => {
                e.stopPropagation();
                handleOpenAddModal(addForm);
              }}
              buttonName="Thêm nội dung"
            />
            <EditButton
              onClick={(e) => {
                e.stopPropagation();
                handleOpenEditModal(EditContentForm, data);
              }}
            />
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(() =>
                  DeleteContent(courseID, unitID, taskID, contentID),
                );
              }}
            />
            <button
              type="button"
              onClick={() => handleToggle()}
              className={`rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-2.5 py-1.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 `}
            >
              <div>
                <DropdownIcon
                  className={`${!activeIndex && 'rotate-180'} duration-300`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* content xổ xuống */}
      <div
        className={`mt-2 overflow-hidden transition-[max-height] duration-300 ease-in-out  ${activeIndex ? 'max-h-screen' : 'max-h-0 duration-300'}`}
      >
        <div
          className={`relative w-full justify-start  ${!activeIndex ? 'hidden' : 'max-h-[30rem] overflow-auto'} `}
        >
          {contentRender()}
        </div>
      </div>

      {DeleteForm(
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        async () => await deleteFunction(),
      )}
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </div>
  );
};

export default ContentList;
