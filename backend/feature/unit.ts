import IUnit from '@/backend/models/data/IUnit';

export async function GetUnitList(courseID: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/unit/list?courseID=${courseID}`,
    { method: 'GET' },
  );
  const info: IUnit[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}
