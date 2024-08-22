import IRegisterCondition from '@/backend/models/validationSchema/IChildrenCondition';

const ChildrenCondition: IRegisterCondition = {
  NAME: {
    MIN: 10,
    MAX: 100,
    REQUIRED: true,
  },

  USERNAME: {
    MIN: 10,
    MAX: 100,
    REQUIRED: true,
  },

  PASSWORD: {
    MIN: 6,
    MAX: 100,
    REQUIRED: true,
  },

  RE_PASSWORD: {
    REQUIRED: true,
  },
};

export default ChildrenCondition;
