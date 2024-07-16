import { IGrade } from '@/backend/models/data/IGrade';

export default function GradeData(dataInput) {
  try {
    const data: IGrade = {
      gradeID: dataInput.gradeID,
      gradeName: dataInput.gradeName,
      gradeDescription: dataInput.gradeDescription,
      gradeImage: dataInput.gradeImage,
    };
    return data;
  } catch {
    return false;
  }
}
