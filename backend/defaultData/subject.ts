import { ISubjectError } from '@/backend/models/messages/ISubjectMessage';
import { ISubject } from '@/backend/models/data/ISubject';

export function DefaultSubjectErrorValue(): ISubjectError {
  return {
    status: true,
    subjectIDError: null,
    subjectNameError: null,
    subjectFileError: null,
    systemError: null,
  };
}

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

export function DefaultSubjectValue(): ISubject {
  return {
    subjectID: '',
    subjectName: '',
    subjectDescription: '',
    subjectImage: '',
  };
}
