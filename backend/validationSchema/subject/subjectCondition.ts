import ISubjectCondition from '@/backend/models/validationSchema/ISubjectCondition';

//MAX: 0 = No max character required
const SubjectCondition: ISubjectCondition = {
  SUBJECT_NAME: {
    MAX: 0,
    REQUIRED: true,
  },
  SUBJECT_DESCRIPTION: {
    MAX: 0,
    REQUIRED: false,
  },
  SUBJECT_IMAGE: {
    REQUIRED: false,
  },
};

export default SubjectCondition;
