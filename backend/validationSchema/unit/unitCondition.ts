import IUnitCondition from '@/backend/models/validationSchema/IUnitCondition';

//MAX: 0 = No max characters requirement
const UnitCondition: IUnitCondition = {
  UNIT_NAME: {
    MAX: 0,
    REQUIRED: true,
  },

  UNIT_DESCRIPTION: {
    MAX: 0,
    REQUIRED: false,
  },
};

export default UnitCondition;
