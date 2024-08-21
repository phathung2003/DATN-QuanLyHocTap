'use client';
import React from 'react';
import { ContentType } from '@/backend/globalVariable';
import { IContentList } from '@/backend/models/data/Content/IContent';

//Form
import PreviewFlashcard from '@/components/form/content/content/type/flashcard/previewFlashcard';
import PreviewCard from '@/components/form/content/content/type/card/previewCard';
import PreviewCalculateTwoNumber from '@/components/form/content/content/type/calculateTwoNumber/previewCalculateTwoNumber';

const UserTaskList: React.FC<{ data: IContentList[] | null }> = ({ data }) => {
  let realIndex = 0;
  return (
    <div className="flex h-[75vh] w-full overflow-auto rounded-lg bg-slate-200 shadow-md dark:bg-slate-800">
      <div className="flex w-full flex-col p-6 text-2xl text-black dark:text-white">
        {data?.map(
          (task, index) =>
            task.contentData &&
            task.contentData.length > 0 && (
              <div key={index} className="flex w-full flex-col">
                <p className="font-bold">
                  Câu {++realIndex}: {task.contentName}
                </p>
                <p className="text-sm">{task.contentDescription}</p>

                <div className="flex w-full items-center justify-center">
                  <div className="my-5 flex w-full max-w-2xl flex-col items-center">
                    <div
                      id="modal"
                      aria-hidden="true"
                      className="flex w-full items-center justify-center"
                    >
                      <div className="relative h-full max-h-[85vh] w-full overflow-auto pr-3">
                        {(() => {
                          switch (task.contentType) {
                            case ContentType.FLASHCARD:
                              return <PreviewFlashcard content={task} />;
                            case ContentType.CARD:
                              return <PreviewCard content={task} />;
                            case ContentType.CALCULATE_TWO_NUMBER:
                              return (
                                <div className=" mb-5 bg-slate-300 p-4 dark:bg-slate-700">
                                  <PreviewCalculateTwoNumber content={task} />
                                </div>
                              );
                            default:
                              return <p>Không hỗ trợ loại nội dung này</p>;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
};

export default UserTaskList;
