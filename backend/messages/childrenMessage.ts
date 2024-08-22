import { IChildrenMessage } from '@/backend/models/messages/IChildrenMessage';
import ChildrenCondition from '@/backend/validationSchema/children/childrenCondition';
const ChildrenMessage: IChildrenMessage = {
  NAME: {
    UNDER_MIN_VALUE: `Họ và tên không được dưới ${ChildrenCondition.NAME.MIN} ký tự`,
    OVER_MAX_VALUE: `Họ và tên không được quá ${ChildrenCondition.NAME.MIN} ký tự`,
    REQUIRED: 'Xin hãy nhập họ và tên',
  },

  USERNAME: {
    UNDER_MIN_VALUE: `Tên đăng nhập không được dưới ${ChildrenCondition.USERNAME.MIN} ký tự`,
    OVER_MAX_VALUE: `Tên đăng nhập không được quá ${ChildrenCondition.USERNAME.MAX} ký tự`,
    USERNAME_EXIST:
      'Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác',
    REQUIRED: 'Xin hãy nhập tên đăng nhập',
  },

  PASSWORD: {
    UNDER_MIN_VALUE: `Mật khẩu không được dưới ${ChildrenCondition.PASSWORD.MIN} ký tự`,
    OVER_MAX_VALUE: `Mật khẩu không được quá ${ChildrenCondition.PASSWORD.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mật khẩu',
  },
  RE_PASSWORD: {
    NO_MATCH: 'Mật khẩu nhập lại không khớp',
    REQUIRED: 'Xin hãy nhập lại mật khẩu',
  },

  ACCOUNT_EXIST: 'Tài khoản đã tồn tại',

  REGISTER_COMPLETED: 'Đăng ký tài khoản thành công',
  REGISTER_FAILED: 'Đăng ký tài khoản thất bại. Vui lòng thử lại sau',
};

export default ChildrenMessage;
