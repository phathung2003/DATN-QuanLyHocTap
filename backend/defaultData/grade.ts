import { IGradeError } from '@/backend/models/messages/IGradeMessage';

const DefaultSubjectErrorValue: IGradeError = {
  status: true,
  gradeIDError: null,
  gradeNameError: null,
  systemError: null,
};

export default DefaultSubjectErrorValue;
