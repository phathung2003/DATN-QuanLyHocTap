import { ISubjectError } from '@/backend/models/messages/ISubjectMessage';
import { ISubject } from '@/backend/models/data/ISubject';
const DefaultSubjectErrorValue: ISubjectError = {
  status: true,
  subjectIDError: null,
  subjectNameError: null,
  systemError: null,
};

export function SubjectEditDefaultValue(data: ISubject): ISubject {
  const editData: ISubject = {
    subjectID: data.subjectID,
    subjectName: data.subjectName,
    subjectDescription: data.subjectDescription,
    subjectImage: data.subjectImage,
    subjectFile: undefined,
  };

  return editData;
}

export default DefaultSubjectErrorValue;
