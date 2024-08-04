import IContent from '@/backend/models/data/Content/IContent';

//Lấy danh sách nội dung bài học
export async function GetContentList(courseID: string, unitID: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/task/list?courseID=${courseID}&unitID=${unitID}`,
    { method: 'GET', cache: 'no-store' },
  );
  const info: IContent[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}
