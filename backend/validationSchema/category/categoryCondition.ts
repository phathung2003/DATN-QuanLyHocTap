import ICategoryCondition from '@/backend/models/validationSchema/ICategoryCondition';

//MAX: 0 = No max characters requirement
const CategoryCondition: ICategoryCondition = {
  CATEGORY_NAME: {
    MAX: 0,
    REQUIRED: true,
  },
  CATEGORY_DESCRIPTION: {
    MAX: 0,
    REQUIRED: false,
  },
  CATEGORY_IMAGE: {
    REQUIRED: false,
  },
};

export default CategoryCondition;
