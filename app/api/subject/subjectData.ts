import { ISubject } from '@/backend/models/data/ISubject';

export default function SubjectData(dataInput) {
  try {
    const data: ISubject = {
      subjectID: dataInput.subjectID,
      subjectName: dataInput.subjectName,
      subjectDescription: dataInput.subjectDescription,
      subjectImage: dataInput.subjectImage,
    };
    return data;
  } catch {
    return false;
  }
}
