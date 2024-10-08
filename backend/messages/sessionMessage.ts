import { ISessionMessage } from '@/backend/models/messages/ISessionMessage';

const SessionMessage: ISessionMessage = {
  INVALID_TOKEN: 'Phiên đăng nhập không hợp lệ. Xin vui lòng đăng nhập lại',
  INFO_NOT_FOUND: 'Lỗi đăng nhập. Xin vui lòng đăng nhập lại',
  SESSION_TIME_OUT: 'Phiên đăng nhập đã hết hạn. Xin vui lòng đăng nhập lại',
  VALID_TOKEN: 'Phiên đăng nhập hợp lệ',
  LOG_OUT: 'Đăng xuất thành công',
};

export default SessionMessage;
