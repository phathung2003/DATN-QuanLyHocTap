import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { IContentList } from '@/backend/models/data/Content/IContent';
import { ToTitleCase } from '@/backend/database/generalFeature';
import { ContentType } from '@/backend/globalVariable';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { DeleteFlashcardContent } from '@/backend/feature/content/flashcard';
import { DeleteCardContent } from '@/backend/feature/content/card';
import { DeleteContentDetail, DeleteContent } from '@/backend/feature/content';

//Form
import EditContentForm from '@/app/admin/course/[courseID]/unit/[unitID]/task/[taskID]/editContentForm';
import AddFlashcardForm from '@/app/admin/course/[courseID]/unit/[unitID]/task/[taskID]/contentManagement/flashcard/addForm';
import EditFlashcardForm from '@/app/admin/course/[courseID]/unit/[unitID]/task/[taskID]/contentManagement/flashcard/editForm';
import AddCardForm from '@/app/admin/course/[courseID]/unit/[unitID]/task/[taskID]/contentManagement/card/addForm';
import EditCardForm from '@/app/admin/course/[courseID]/unit/[unitID]/task/[taskID]/contentManagement/card/editForm';
import AddCalculate_Two_NumberForm from '@/app/admin/course/[courseID]/unit/[unitID]/task/[taskID]/contentManagement/calculate_Two_Number/addForm';
import EditCalculate_Two_NumberForm from '@/app/admin/course/[courseID]/unit/[unitID]/task/[taskID]/contentManagement/calculate_Two_Number/editForm';
import DeleteForm from '@/components/Form/deleteModal';
import OverlapForm from '@/components/Form/overlapForm';

//Icon
import DropdownIcon from '@/public/vector/down-list-content.svg';
import AddButton from '@/components/Button/addButton';
import DeleteButton from '@/components/Button/deleteButton';
import EditButton from '@/components/Button/editButton';
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

const defaultPicture = process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE ?? '';

const Accordion: React.FC<ContentFormProps> = ({
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
        addForm = AddCalculate_Two_NumberForm;
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
              onClick={() => handleOpenEditModal(EditContentForm, data)}
            />
            <DeleteButton
              onClick={() =>
                handleDelete(() =>
                  DeleteContent(courseID, unitID, taskID, contentID),
                )
              }
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

export default Accordion;

function Flashcard(
  data: IContentList,
  handleDelete,
  handleOpenEditModal,
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
) {
  if (data.contentData == null)
    return (
      <p className="flex w-full justify-center text-lg font-bold">
        Chưa có nội dung
      </p>
    );

  const flashcard = data.contentData as IFlashcardContent[];

  return (
    <div>
      <table id="table" className="w-full ">
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

        {flashcard.length == 0 ? (
          <tbody>
            <tr>
              <td colSpan={6}>
                <p className="my-4 flex w-full justify-center text-lg font-bold">
                  Không có nội dung nào
                </p>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="h-[50px] items-center divide-y">
            {flashcard
              .sort((a, b) => a.position - b.position)
              .map((flashcardData, index) => (
                <tr
                  key={flashcardData.position}
                  className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  <td id="gradeID" className="w-[30px] text-center">
                    {index + 1}
                  </td>

                  <td id="gradeID" className="h-[50px] w-[100px] px-4">
                    <Image
                      src={flashcardData.firstSideImage ?? defaultPicture}
                      alt="firstSideImage"
                      width={100}
                      height={50}
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </td>
                  <td id="name" className="px-4">
                    {flashcardData.firstSideText}
                  </td>
                  <td id="subject" className="h-[50px] w-[100px] px-4">
                    <Image
                      src={flashcardData.secondSideImage ?? defaultPicture}
                      alt="secondSideImage"
                      width={100}
                      height={50}
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </td>
                  <td id="subject" className="px-4">
                    {flashcardData.firstSideText}
                  </td>

                  <td id="managerOption">
                    <div className="flex items-center justify-end pr-4">
                      <EditButton
                        onClick={() =>
                          handleOpenEditModal(EditFlashcardForm, flashcardData)
                        }
                      />
                      <DeleteButton
                        onClick={() =>
                          handleDelete(() =>
                            DeleteFlashcardContent(
                              courseID,
                              unitID,
                              taskID,
                              contentID,
                              flashcardData,
                            ),
                          )
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

function Card(
  data: IContentList,
  handleDelete,
  handleOpenEditModal,
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
) {
  if (data.contentData == null)
    return (
      <p className="flex w-full justify-center text-lg font-bold">
        Chưa có nội dung
      </p>
    );

  const card = data.contentData as ICardContent[];
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

        {card.length == 0 ? (
          <tbody>
            <tr>
              <td colSpan={4}>
                <p className="my-4 flex w-full justify-center text-lg font-bold">
                  Không có nội dung nào
                </p>
              </td>
            </tr>
          </tbody>
        ) : (
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

                  <td id="managerOption">
                    <div className="flex items-center justify-end pr-4">
                      <EditButton
                        onClick={() =>
                          handleOpenEditModal(EditCardForm, cardData)
                        }
                      />
                      <DeleteButton
                        onClick={() =>
                          handleDelete(() =>
                            DeleteCardContent(
                              courseID,
                              unitID,
                              taskID,
                              contentID,
                              cardData,
                            ),
                          )
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

function CalculateTwoNumber(
  data: IContentList,
  handleDelete,
  handleOpenEditModal,
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
) {
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
        {math.length == 0 ? (
          <tbody>
            <tr>
              <td colSpan={3}>
                <p className="my-4 flex w-full justify-center text-lg font-bold">
                  Không có nội dung nào
                </p>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="h-[50px] items-center divide-y">
            {math
              .sort((a, b) => a.position - b.position)
              .map((mathData, index) => (
                <tr
                  key={mathData.position}
                  className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  <td id="gradeID" className="w-[30px] text-center">
                    {index + 1}
                  </td>
                  <td id="gradeID" className="w-[30px] text-center">
                    {mathData.firstNumber} {mathData.operator}{' '}
                    {mathData.secondNumber}
                  </td>

                  <td id="managerOption">
                    <div className="flex items-center justify-end pr-4">
                      <EditButton
                        onClick={() =>
                          handleOpenEditModal(
                            EditCalculate_Two_NumberForm,
                            mathData,
                          )
                        }
                      />
                      <DeleteButton
                        onClick={() =>
                          handleDelete(() =>
                            DeleteContentDetail(
                              courseID,
                              unitID,
                              taskID,
                              contentID,
                              mathData.position,
                            ),
                          )
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
