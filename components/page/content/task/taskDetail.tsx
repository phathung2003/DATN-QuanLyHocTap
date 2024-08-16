'use client';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  TaskEditDefaultValue,
  DefaultTaskErrorValue,
} from '@/backend/defaultData/task';
import { IContentList } from '@/backend/models/data/Content/IContent';
import { ResetError, EditTask, DeleteTask } from '@/backend/feature/task';
import ITask from '@/backend/models/data/ITask';
import DeleteForm from '@/components/form/deleteModal';
import SchemaTask from '@/backend/validationSchema/task/taskSchema';
import FormikShowError from '@/components/element/notification/formikForm';
import BottomFormError from '@/components/element/notification/bottomForm';

//Form
import AddContentForm from '@/components/form/content/content/addContentForm';
import AddTaskForm from '@/components/form/content/task/addTaskForm';
import OverlapForm from '@/components/form/overlapForm';

//Button
import BackContentButton from '@/components/element/button/backContentButton';
import SubmitButton from '@/components/element/button/submitButton';
import DeleteButton from '@/components/element/button/deleteButton';
import AddButton from '@/components/element/button/addButton';

// Accordionlist
import ContentList from '@/components/page/content/content/contentList';

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
  const [modalHeader, setModalHeader] = useState('Thêm dạng nội dung bài học');
  const [currentForm, setCurrentForm] = useState<React.FC>(() => AddTaskForm);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteFunction, setDeleteFunction] = useState<() => Promise<void>>(
    () => async () => {},
  );
  // Add Content Form
  const handleOpenAddModal = (FormComponent: React.FC<ContentProperties>) => {
    const WrappedFormComponent = () => (
      <FormComponent courseID={courseID} unitID={unitID} taskID={taskID} />
    );
    setCurrentForm(() => WrappedFormComponent);
    setIsModalOpen(true);
    setModalHeader('Thêm dạng nội dung bài học');
  };

  //Delete Form
  const handleDelete = (func: () => Promise<void>) => {
    setIsDeleteModalOpen(true);
    setDeleteFunction(() => func);
  };
  return (
    <section className="antialiase overflow-y-auto px-4 lg:px-8">
      <BackContentButton url={`/admin/course/${courseID}/unit/${unitID}`} />

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
                    handleDelete(() =>
                      DeleteTask(courseID, unitID, taskID, false, setError),
                    )
                  }
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-10">
        <div className="mt-3 grid grid-cols-2 gap-4 sm:mb-5 min-[890px]:grid-cols-2">
          <div className="flex items-center">
            <h2
              id="header"
              className="font-manrope text-2xl font-bold text-black dark:text-white"
            >
              Nội dung bài học
            </h2>
          </div>
          <div className="flex items-center justify-end">
            <AddButton
              onClick={() => handleOpenAddModal(AddContentForm)}
              buttonName="Thêm dạng nội dung"
            />
          </div>
        </div>
        {contentList.length == 0 ? (
          <p>Hiện tại chưa có nội dung nào</p>
        ) : (
          <div className="flex flex-col overflow-auto">
            {contentList.map((contentData, index) => (
              <div key={contentData.contentID ?? index} className="my-3">
                <ContentList
                  data={contentData}
                  courseID={courseID}
                  unitID={unitID}
                  taskID={taskID}
                  contentID={contentData.contentID ?? ''}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {DeleteForm(
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        async () => await deleteFunction(),
      )}
      {OverlapForm(isModalOpen, setIsModalOpen, currentForm, modalHeader)}
    </section>
  );
};

export default TaskDetail;
