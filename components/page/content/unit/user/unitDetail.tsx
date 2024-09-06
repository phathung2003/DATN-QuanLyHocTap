'use client';
import { useState } from 'react';
import { IContentCourseList } from '@/backend/models/data/Content/IContent';
import { IContentList } from '@/backend/models/data/Content/IContent';
import UserTaskList from '@/components/page/content/task/user/taskList';
import CatalogueList from '@/components/page/content/task/user/catalogue';

//Icon - Button
import MenuIcon from '@/public/vector/menu.svg';
import ExitIcon from '@/public/vector/exit-circle.svg';
import BackContentButton from '@/components/element/button/backContentButton';

const UnitDetail: React.FC<{
  data: IContentCourseList[];
  courseID: string;
}> = ({ data, courseID }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const [content, setContent] = useState<IContentList[] | null>(null);

  return (
    <div>
      <div className="mb-2 flex h-10 w-full">
        <div className="relative flex w-full items-center justify-between p-3">
          <BackContentButton url={`/parent/course/${courseID}`} />

          <button
            className="rounded-full bg-rose-500 p-2 text-white shadow-lg"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            {openSidebar ? <ExitIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className="flex h-[75vh] bg-slate-50 dark:bg-black ">
        <div className="relative flex flex-1 flex-col transition-all duration-100">
          <main>
            <div className="mx-auto max-w-screen-3xl whitespace-nowrap ">
              <UserTaskList data={content} />
            </div>
          </main>
        </div>
        <div className="ml-4 flex">
          <CatalogueList
            openSidebar={openSidebar}
            data={data}
            setContent={setContent}
          />
        </div>
      </div>
    </div>
  );
};

export default UnitDetail;
