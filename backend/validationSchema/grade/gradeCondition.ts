import IGradeCondition from '@/backend/models/validationSchema/IGradeCondition';

//MAX: 0 = No max character required
const GradeCondition: IGradeCondition = {
  GRADE_NAME: {
    MAX: 0,
    REQUIRED: true,
  },
  GRADE_DESCRIPTION: {
    MAX: 0,
    REQUIRED: false,
  },
  GRADE_IMAGE: {
    REQUIRED: false,
  },
};

export default GradeCondition;
