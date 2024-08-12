import IContentCondition from '@/backend/models/validationSchema/content/IContentCondition';

//MAX: 0 = No max characters requirement
const ContentCondition: IContentCondition = {
  CONTENT_NAME: {
    MAX: 0,
    REQUIRED: true,
  },

  CONTENT_DESCRIPTION: {
    MAX: 0,
    REQUIRED: false,
  },
};

export default ContentCondition;
