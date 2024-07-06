import { ISubjectError } from '@/backend/models/messages/ISubjectMessage';

const DefaultSubjectErrorValue: ISubjectError = {
  status: true,
  subjectIDError: null,
  subjectNameError: null,
  systemError: null,
};

export default DefaultSubjectErrorValue;
