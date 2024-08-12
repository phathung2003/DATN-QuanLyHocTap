'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  TaskEditDefaultValue,
  DefaultTaskErrorValue,
} from '@/backend/defaultData/task';
import { ResetError, EditTask, DeleteTask } from '@/backend/feature/task';
import SchemaTask from '@/backend/validationSchema/task/taskSchema';
import FormikShowError from '@/components/ErrorMessage/formikForm';
import BottomFormError from '@/components/ErrorMessage/bottomForm';
import DeleteForm from '@/components/Form/deleteModal';
import ITask from '@/backend/models/data/ITask';

//Form
import AddContentForm from '@/app/admin/course/[courseID]/unit/[unitID]/task/[taskID]/addContentForm';
import OverlapForm from '@/components/Form/overlapForm';

//Button
import BackButton from '@/components/Button/backButton';
import SubmitButton from '@/components/Button/submitButton';
import DeleteButton from '@/components/Button/deleteButton';
import AddButton from '@/components/Button/addButton';
import AddTaskForm from '@/app/admin/course/[courseID]/unit/[unitID]/addTaskForm';
import { IContentList } from '@/backend/models/data/Content/IContent';

// Accordionlist
import Accordion from '@/app/admin/course/[courseID]/unit/[unitID]/task/[taskID]/contentList';

interface ContentProperties {
  courseID: string;
  unitID: string;
  taskID: string;
}

const TaskDetail: React.FC<{
  courseID: string;
  unitID: string;
  taskID: string;
  taskInfo: ITask;
  contentList: IContentList[];
}> = ({ courseID, unitID, taskID, taskInfo, contentList }) => {
  const [error, setError] = useState(DefaultTaskErrorValue());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('Thêm danh mục bài học');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddTaskForm);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteFunction, setDeleteFunction] = useState<Promise<void>>();

  // Add Content Form
  const handleOpenAddModal = (FormComponent: React.FC<ContentProperties>) => {
    const WrappedFormComponent = () => (
      <FormComponent courseID={courseID} unitID={unitID} taskID={taskID} />
    );
    setCurrentForm(() => WrappedFormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm danh mục bài học');
  };

  //Delete Form
  const handleDelete = (func: Promise<void>) => {
    setIsDeleteModalOpen(true);
    setDeleteFunction(func);
  };
  return (
    <section className="antialiase overflow-y-auto px-4 lg:px-8">
      <BackButton />
      <div className="my-3 flex items-start justify-between">
        <div>
          <h2
            id="header"
            className="font-manrope text-2xl font-bold text-black dark:text-white"
          >
            Chi tiết danh mục bài học
          </h2>
          <h1 id="createAt" className="text-black dark:text-white">
            Ngày tạo: {`${taskInfo.taskUploadDate ?? 'Không xác định'}`}
          </h1>

          <h1 id="lastEdit" className="text-black dark:text-white">
            Chỉnh lần cuối:
            {`${taskInfo.taskLastEditDate ?? 'Chưa thực hiện chỉnh sửa'}`}
          </h1>
        </div>

        <div>
          <h1 id="courseID" className="text-black dark:text-white">
            Mã khóa học: {courseID}
          </h1>
          <h1 id="unitID" className="text-black dark:text-white">
            Mã bài học: {unitID}
          </h1>
          <h1 id="taskID" className="text-black dark:text-white">
            Mã danh mục: {taskID}
          </h1>
        </div>
      </div>

      <div>
        <Formik
          initialValues={TaskEditDefaultValue(taskInfo)}
          validationSchema={SchemaTask}
          onSubmit={(data) =>
            EditTask(courseID, unitID, taskID, data, taskInfo, setError)
          }
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="flex gap-4">
                <div id="taskName_Add" className="w-full">
                  <label
                    htmlFor="taskName_AddInput"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Tên bài học
                  </label>

                  <Field
                    id="taskName_AddInput"
                    name="taskName"
                    type="text"
                    placeholder="Điền tên bài học..."
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      ResetError(event, setFieldValue, setError)
                    }
                    className="text-gray-900 dark:placeholder-gray-400 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm focus:border-blue-600 focus:ring-lime-600 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-lime-500"
                  />
                  <FormikShowError
                    type={'Add'}
                    filedName={'taskName'}
                    errorMessage={null}
                  />
                </div>
              </div>

              <div id="taskDescription_Add">
                <label
                  htmlFor="taskDescription_AddInput"
                  className="text-gray-900 mb-2 mt-3 block text-sm font-medium dark:text-white"
                >
                  Mô tả
                </label>

                <Field
                  id="taskDescription_AddInput"
                  name="taskDescription"
                  type="text"
                  placeholder="Điền vào mô tả..."
                  className="text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-2 block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
                <FormikShowError
                  type={'Add'}
                  filedName={'taskDescription'}
                  errorMessage={null}
                />
              </div>

              <BottomFormError type={'Edit'} errorMessage={error.systemError} />
              <div className="flex justify-end space-x-4">
                <SubmitButton buttonName="Cập nhật" />
                <DeleteButton
                  onClick={() =>
                    handleDelete(DeleteTask(courseID, unitID, taskID, setError))
                  }
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-10">
        <div className="x mt-3 grid grid-cols-1 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
          <div>
            <h2
              id="header"
              className="font-manrope text-2xl font-bold text-black dark:text-white"
            >
              Danh mục bài học
            </h2>
          </div>

          <div className="flex flex-col gap-2.5 min-[890px]:flex-row ">
            <AddButton
              onClick={() => handleOpenAddModal(AddContentForm)}
              buttonName="Thêm danh mục bài học"
            />
          </div>
        </div>

        <div className="flex flex-col overflow-auto">
          {contentList.map((contentData, index) => (
            <div key={contentData.contentID ?? index} className="my-3">
              <Accordion
                data={contentData}
                courseID={courseID}
                unitID={unitID}
                taskID={taskID}
                contentID={contentData.contentID ?? ''}
              />
            </div>
          ))}
        </div>
      </div>
      {DeleteForm(
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        async () => await deleteFunction,
      )}
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </section>
  );
};

export default TaskDetail;
