import { ISubject } from '@/backend/models/data/ISubject';
export async function GetSubject() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/subject/list`,
    {
      method: 'GET',
    },
  );
  const info: ISubject[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}
