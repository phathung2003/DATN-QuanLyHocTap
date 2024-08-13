import { IGrade } from '@/backend/models/data/IGrade';
import { ISubject } from '@/backend/models/data/ISubject';

//Lấy cấp độ
export async function GetGrade() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/grade/list`,
    { method: 'GET' },
  );
  const info: IGrade[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}

//Lấy môn học
export async function GetSubject() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/subject/list`,
    { method: 'GET' },
  );
  const info: ISubject[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}
