'use client';
import IUnit from '@/backend/models/data/IUnit';

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { UnitEditDefaultValue } from '@/backend/defaultData/unit';

import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';
import { EditUnit, ResetError, DeleteUnit } from '@/backend/feature/unit';
import SchemaUnit from '@/backend/validationSchema/unit/unitSchema';
import OverlapForm from '@/components/Form/overlapForm';
import { IUnitError } from '@/backend/models/messages/IUnitMessage';
import ITask from '@/backend/models/data/ITask';
//Icon
import SubmitButton from '@/components/Button/submitButton';
import DetailButton from '@/components/Button/detailButton';
//Button
import DeleteButton from '@/components/Button/deleteButton';
import AddButton from '@/components/Button/addButton';
import SearchBar from '@/components/Field/searchBar';
import AddTaskForm from './addTaskForm';

const DefaultErrorMessage: IUnitError = {
  status: false,
  courseIDError: null,
  unitNoError: null,
  systemError: null,
};

interface TaskProperties {
  courseID: string;
  unitID: string;
}
const UnitDetail: React.FC<{
  courseID: string;
  unitID: string;
  unitInfo: IUnit;
  taskList: ITask[];
}> = ({ courseID, unitID, unitInfo, taskList }) => {
  const [error, setError] = useState(DefaultErrorMessage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm bài');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddTaskForm);
  //eslint-disable-next-line
  const [search, setSearch] = useState<string>('');

  // Add Unit Form
  const handleOpenAddModal = (FormComponent: React.FC<TaskProperties>) => {
    const WrappedFormComponent = () => (
      <FormComponent courseID={courseID} unitID={unitID} />
    );
    setCurrentForm(() => WrappedFormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm bài học');
  };

  return (
    <section className="antialiase overflow-y-auto px-4 lg:px-8">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h2
            id="header"
            className="font-manrope text-2xl font-bold text-black dark:text-white"
          >
            Chi tiết bài học
          </h2>
          <h1 id="createAt" className="text-black dark:text-white">
            Ngày tạo: {`${unitInfo.unitUploadDate ?? 'Không xác định'}`}
          </h1>

          <h1 id="lastEdit" className="text-black dark:text-white">
            Chỉnh lần cuối:{' '}
            {`${unitInfo.unitLastEditDate ?? 'Chưa thực hiện chỉnh sửa'}`}
          </h1>
        </div>

        <div>
          <h1 id="courseID" className="text-black dark:text-white">
            Mã khóa học: {courseID}
          </h1>
          <h1 id="unitID" className="text-black dark:text-white">
            Mã bài học: {unitID}
          </h1>
        </div>
      </div>

      <div>
        <Formik
          initialValues={UnitEditDefaultValue(unitInfo)}
          validationSchema={SchemaUnit}
          onSubmit={(editData) =>
            EditUnit(courseID, unitID, editData, unitInfo, setError)
          }
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="flex gap-4">
                <div id="unitNo_Add" className="w-1/3">
                  <label
                    htmlFor="unitNo_AddInput"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Thứ tự bài học
                  </label>

                  <Field
                    id="unitNo_AddInput"
                    name="unitNo"
                    type="text"
                    placeholder="Điền số bài học..."
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      ResetError(event, setFieldValue, setError)
                    }
                    className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
                  />
                  <FormikShowError
                    type={'Add'}
                    filedName={'unitNo'}
                    errorMessage={error.unitNoError}
                  />
                </div>

                <div id="unitName_Add" className="w-2/3">
                  <label
                    htmlFor="unitName_AddInput"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Tên bài học
                  </label>

                  <Field
                    id="unitName_AddInput"
                    name="unitName"
                    type="text"
                    placeholder="Điền tên bài học..."
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      ResetError(event, setFieldValue, setError)
                    }
                    className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
                  />
                  <FormikShowError
                    type={'Add'}
                    filedName={'unitName'}
                    errorMessage={null}
                  />
                </div>
              </div>

              <div id="unitDescription_Add">
                <label
                  htmlFor="unitDescription_AddInput"
                  className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
                >
                  Mô tả
                </label>

                <Field
                  id="unitDescription_AddInput"
                  name="unitDescription"
                  type="text"
                  placeholder="Điền vào mô tả..."
                  className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
                <FormikShowError
                  type={'Add'}
                  filedName={'unitDescription'}
                  errorMessage={null}
                />
              </div>

              <BottomFormError type={'Add'} errorMessage={error.systemError} />
              <div className="flex justify-end space-x-4">
                <SubmitButton buttonName="Cập nhật" />
                <DeleteButton
                  onClick={async () =>
                    await DeleteUnit(courseID, unitID, setError)
                  }
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-4">
        <div>
          <h2
            id="header"
            className="font-manrope my-3 text-2xl font-bold text-black dark:text-white"
          >
            Nội dung bài học
          </h2>
        </div>
        <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
          <SearchBar onChange={(e) => setSearch(e.target.value)} />

          <div className="flex flex-col gap-2.5 min-[890px]:flex-row ">
            <AddButton
              onClick={() => handleOpenAddModal(AddTaskForm)}
              buttonName="Thêm Bài"
            />
          </div>
        </div>
        <div className="flex max-h-[65vh] flex-col overflow-auto">
          <table id="table" className="w-full">
            <thead className="text-gray-400 sticky top-0 bg-slate-200 text-left text-xs uppercase dark:bg-slate-700 dark:text-white">
              <tr>
                <th id="idHead" className="w-[30px] text-center">
                  STT
                </th>
                <th id="nameHead" className="px-4 py-3">
                  Tên bài
                </th>
                <th id="createAtHead" className="w-[13rem] px-4 py-3">
                  Ngày tạo
                </th>
                <th id="LastUpdateHead" className="w-[13rem] px-4 py-3">
                  Chỉnh sửa lần cuối
                </th>
                <th id="managerOptionHead" className="w-[12rem] px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="h-[50px] items-center divide-y">
              {taskList.map((data, index) => (
                <tr
                  key={index}
                  className="dark:border-gray-700 border-b border-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  <td id="unitID" className="w-[30px] text-center">
                    {index}
                  </td>

                  <td id="name" className="px-4">
                    {data.taskName}
                  </td>
                  <td id="createAt" className="px-4">
                    {`${data.taskUploadDate}`}
                  </td>
                  <td id="editAt" className="px-4">
                    {!data.taskLastEditDate
                      ? 'Chưa chỉnh sửa'
                      : `${data.taskLastEditDate}`}
                  </td>
                  <td>
                    <div
                      id="managerOption"
                      className="flex items-center justify-end px-4 py-3"
                    >
                      <DetailButton
                        link={`/admin/qlkhoahoc/${courseID}/unit/${unitID}`}
                        buttonName="Chi tiết"
                      />
                      <div className="ml-4">
                        <DeleteButton
                          onClick={async () =>
                            await DeleteUnit(courseID, data.taskID ?? '', null)
                          }
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </section>
  );
};

export default UnitDetail;
