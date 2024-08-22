/*eslint-disable */
import React from 'react';
import Giaobai from '@/components/page/parent/assignPage';
import { GetCoursWithUnit } from '@/backend/feature/content/course';
import { GetUserID } from '@/backend/feature/user/validate';
import { GetChildren } from '@/backend/feature/children';

export default async function Assignment() {
  const user: string = await GetUserID();
  const childrenData = await GetChildren(user);
  const courseInfo = await GetCoursWithUnit();

  return (
    <div>
      <Giaobai
        courseInfo={courseInfo}
        children={childrenData}
        parentID={user}
      ></Giaobai>
    </div>
  );
}
