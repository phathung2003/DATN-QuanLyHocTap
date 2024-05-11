import { ICondition, IErrorMessage } from "./ICondition"

export const Condition : ICondition = {
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
}

export const ErrorMessage : IErrorMessage = {
    NAME:{
        UNDER_MIN_VALUE: 'Họ và tên không được dưới 10 ký tự',
        OVER_MAX_VALUE: 'Họ và tên không được quá 100 ký tự',
        REQUIRED: 'Xin hãy nhập họ và tên',
    },

    USERNAME:{
        UNDER_MIN_VALUE: 'Tên đăng nhập không được dưới 10 ký tự',
        OVER_MAX_VALUE: 'Tên đăng nhập không được quá 100 ký tự',
        REQUIRED: 'Xin hãy nhập tên đăng nhập',
    },

    PHONE_NUMBER:{
        UNDER_LENGTH_VALUE: 'Xin hãy nhập đúng số điện thoại',
        DONT_ALLOWED_CHARACTERS: 'Số điện thoại không được chứa ký tự đặc biệt',
        HAVE_BANNED_CHARACTERS: 'Số điện thoại không hợp lệ',
        REQUIRED: 'Xin hãy nhập số điện thoại',
    },

    EMAIL:{
        WRONG_EMAIL_FORMAT: 'Email không hợp lệ',
        REQUIRED: 'Xin hãy nhập email',
    },

    PASSWORD:{
        UNDER_MIN_VALUE: 'Mật khẩu không được dưới 6 ký tự',
        OVER_MAX_VALUE: 'Mật khẩu không được quá 100 ký tự',
        REQUIRED: 'Xin hãy nhập mật khẩu',
    },
    RE_PASSWORD:{
        NO_MATCH: 'Mật khẩu nhập lại không khớp',
        REQUIRED: 'Xin hãy nhập lại mật khẩu',
    },
}