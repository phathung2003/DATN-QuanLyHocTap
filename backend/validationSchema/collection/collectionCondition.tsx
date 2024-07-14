import ICollectionCondition from '@/backend/models/validationSchema/ICollectionCondition';

//MAX: 0 = No max characters requirement
const CollectionCondition: ICollectionCondition = {
  COLLECTION_NAME: {
    MAX: 0,
    REQUIRED: true,
  },

  COLLECTION_GRADE: {
    REQUIRED: true,
  },

  COLLECTION_SUBJECT: {
    REQUIRED: true,
  },

  COLLECTION_DESCRIPTION: {
    MAX: 0,
    REQUIRED: false,
  },

  COLLECTION_IMAGE: {
    REQUIRED: false,
  },
};

export default CollectionCondition;
