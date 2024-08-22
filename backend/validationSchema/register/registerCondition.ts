import IRegisterCondition from '@/backend/models/validationSchema/IRegisterCondition';

const RegisterCondition: IRegisterCondition = {
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

  PHONE_NUMBER: {
    LENGTH: 10,
    ALLOWED_CHARACTERS: true,
    REGEX_HAVE_CHARACTER: /^[0-9.,;'"-]+$/,
    REGEX_NO_CHARACTER: /^\d+$/,
    REQUIRED: true,
  },

  EMAIL: {
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

export default RegisterCondition;
