import { IContentList } from '@/backend/models/data/Content/IContent';
import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { DeleteContentDetail } from '@/backend/feature/content';

//Form
import EditCalculate_Two_NumberForm from '@/components/form/contentManagement/content/calculate_Two_Number/editForm';

//Icon
import DeleteButton from '@/components/button/deleteButton';
import EditButton from '@/components/button/editButton';

export default function CalculateTwoNumber(
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
