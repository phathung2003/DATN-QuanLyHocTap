import Image from 'next/image';
import { IContentList } from '@/backend/models/data/Content/IContent';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';
import { DeleteFlashcardContent } from '@/backend/feature/content/flashcard';

//Form
import EditFlashcardForm from '@/components/form/content/content/type/flashcard/editFlashcardForm';

//Button - Icon
import DeleteButton from '@/components/element/button/deleteButton';
import EditButton from '@/components/element/button/editButton';

const defaultPicture = process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE ?? '';

export default function Flashcard(
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
                  <td id="card" className="w-[30px] text-center">
                    {index + 1}
                  </td>

                  <td id="firstSideImage" className="h-[9rem] w-[9rem] px-4">
                    <div className="relative h-[100px] w-[100px]">
                      <Image
                        src={flashcardData.firstSideImage ?? defaultPicture}
                        alt="firstSideImage"
                        fill
                        sizes="(max-width: 100px) 100vw, 100px"
                        loading="lazy"
                        style={{ objectFit: 'fill' }} // Use the style prop to set object-fit
                      />
                    </div>
                  </td>
                  <td id="name" className="px-4">
                    {flashcardData.firstSideText}
                  </td>
                  <td id="secondSideImage" className="h-[9rem] w-[9rem] px-4">
                    <div className="relative h-[100px] w-[100px]">
                      <Image
                        src={flashcardData.secondSideImage ?? defaultPicture}
                        alt="secondSideImage"
                        fill
                        sizes="(max-width: 100px) 100vw, 100px"
                        loading="lazy"
                        style={{ objectFit: 'fill' }} // Use the style prop to set object-fit
                      />
                    </div>
                  </td>
                  <td id="subject" className="px-4">
                    {flashcardData.secondSideText}
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
