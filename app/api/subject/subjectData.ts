import { ISubject } from '@/backend/models/data/ISubject';

export default function SubjectData(dataInput) {
  try {
    const data: ISubject = {
      subjectID: dataInput.data.subjectID,
      subjectName: dataInput.data.subjectName,
      subjectDescription: dataInput.data.subjectDescription,
      subjectImage: dataInput.data.subjectImage,
    };
    return data;
  } catch {
    return false;
  }
}
