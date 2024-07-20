import { IGrade } from '@/backend/models/data/IGrade';

export default function GradeData(dataInput) {
  try {
    const data: IGrade = {
      gradeID: dataInput.data.gradeID,
      gradeName: dataInput.data.gradeName,
      gradeDescription: dataInput.data.gradeDescription,
      gradeImage: dataInput.data.gradeImage,
    };
    return data;
  } catch {
    return false;
  }
}
