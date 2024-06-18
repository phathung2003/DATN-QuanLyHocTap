import { ISessionErrorMessage } from '@/components/models/error_messages/ISessionCondition';
export const SessionErrorMessage: ISessionErrorMessage = {
  INVALID_TOKEN: 'Phiên đăng nhập không hợp lệ. Xin vui lòng đăng nhập lại',
  INFO_NOT_FOUND: 'Lỗi đăng nhập. Xin vui lòng đăng nhập lại',
  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
  SESSION_TIME_OUT: 'Phiên đăng nhập đã hết hạn. Xin vui lòng đăng nhập lại',
};
