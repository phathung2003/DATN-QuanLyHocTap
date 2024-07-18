import ICourseCondition from '@/backend/models/validationSchema/ICourseCondition';

//MAX: 0 = No max characters requirement
const CourseCondition: ICourseCondition = {
  COURSE_NAME: {
    MAX: 0,
    REQUIRED: true,
  },

  COURSE_GRADE: {
    REQUIRED: true,
  },

  COURSE_SUBJECT: {
    REQUIRED: true,
  },

  COURSE_DESCRIPTION: {
    MAX: 0,
    REQUIRED: false,
  },

  COURSE_IMAGE: {
    REQUIRED: false,
  },
};

export default CourseCondition;
