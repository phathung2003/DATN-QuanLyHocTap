import Image from 'next/image';
import { IContentList } from '@/backend/models/data/Content/IContent';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { DeleteCardContent } from '@/backend/feature/content/card';

//Form
import EditCardForm from '@/components/form/content/content/type/card/editCardForm';

//Button - Icon
import DeleteButton from '@/components/element/button/deleteButton';
import EditButton from '@/components/element/button/editButton';

const defaultPicture = process.env.NEXT_PUBLIC_SUBJECT_DEFAULT_IMAGE ?? '';

export default function Card(
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
        <thead className="text-gray-400 sticky top-0 z-10 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
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
                  <td id="image" className="w-[30px] text-center">
                    {cardData.position}
                  </td>
                  <td id="image" className="h-[9rem] w-[9rem] px-4">
                    <div className="relative h-[100px] w-[120px]">
                      <Image
                        src={cardData.image ?? defaultPicture}
                        alt="image"
                        fill
                        sizes="(max-width: 100px) 100vw, 100px"
                        loading="lazy"
                        style={{ objectFit: 'fill' }} // Use the style prop to set object-fit
                      />
                    </div>
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
