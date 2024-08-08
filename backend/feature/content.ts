import { IContentList } from '@/backend/models/data/Content/IContent';

//Lấy danh sách nội dung bài học
export async function GetContentList(
  courseID: string,
  unitID: string,
  taskID: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/list?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}`,
    { method: 'GET', cache: 'no-store' },
  );
  const info: IContentList[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}
