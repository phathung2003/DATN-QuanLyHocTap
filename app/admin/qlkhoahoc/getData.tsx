import ICourse from '@/backend/models/data/ICourse';
//Lấy cấp độ
export async function GetCollection() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/collection/list`,
    { method: 'GET' },
  );
  const info: ICourse[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}
