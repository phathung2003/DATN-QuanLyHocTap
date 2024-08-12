import ICardCondition from '@/backend/models/validationSchema/content/ICardCondition';

//MAX: 0 = No max characters requirement
const CardCondition: ICardCondition = {
  TEXT: {
    MAX: 0,
    REQUIRED: false,
  },

  IMAGE: {
    REQUIRED: false,
  },
};

export default CardCondition;
