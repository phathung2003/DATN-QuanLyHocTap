/* eslint-disable prettier/prettier */
import {
  IRegisterCondition,
  IRegisterErrorMessage,
} from '@/components/models/error_messages/IRegisterCondition';

export const Condition: IRegisterCondition = {
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
    REQUIRED: false,
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

export const ErrorMessage: IRegisterErrorMessage = {
  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
  NAME: {
    UNDER_MIN_VALUE: 'Họ và tên không được dưới 10 ký tự',
    OVER_MAX_VALUE: 'Họ và tên không được quá 100 ký tự',
    REQUIRED: 'Xin hãy nhập họ và tên',
  },

  USERNAME: {
    UNDER_MIN_VALUE: 'Tên đăng nhập không được dưới 10 ký tự',
    OVER_MAX_VALUE: 'Tên đăng nhập không được quá 100 ký tự',
    USERNAME_EXIST:
      'Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác',
    REQUIRED: 'Xin hãy nhập tên đăng nhập',
  },

  PHONE_NUMBER: {
    UNDER_LENGTH_VALUE: 'Xin hãy nhập đúng số điện thoại',
    DONT_ALLOWED_CHARACTERS: 'Số điện thoại không được chứa ký tự đặc biệt',
    HAVE_BANNED_CHARACTERS: 'Số điện thoại không hợp lệ',
    PHONE_NUMBER_EXIST: 'Số điện thoại đã tồn tại, vui lòng chọn số khác',
    REQUIRED: 'Xin hãy nhập số điện thoại',
  },

  EMAIL: {
    WRONG_EMAIL_FORMAT: 'Email không hợp lệ',
    EMAIL_EXIST: 'Email đã tồn tại, vui lòng chọn email khác',
    REQUIRED: 'Xin hãy nhập email',
  },

  PASSWORD: {
    UNDER_MIN_VALUE: 'Mật khẩu không được dưới 6 ký tự',
    OVER_MAX_VALUE: 'Mật khẩu không được quá 100 ký tự',
    REQUIRED: 'Xin hãy nhập mật khẩu',
  },
  RE_PASSWORD: {
    NO_MATCH: 'Mật khẩu nhập lại không khớp',
    REQUIRED: 'Xin hãy nhập lại mật khẩu',
  },
};