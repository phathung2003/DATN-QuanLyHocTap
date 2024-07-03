import { IGrade } from '@/backend/models/data/IGrade';
export async function GetGrade() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/grade/list`,
    {
      method: 'GET',
    },
  );
  const info: IGrade[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}
