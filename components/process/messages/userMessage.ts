import IUserMessage from '@/components/models/messages/IUserMessage';

const UserMessage: IUserMessage = {
  RESET_PASSWORD_INVALID_INFO: 'Thông tin không hợp lệ.',
  RESET_PASSWORD_EMAIL_MISSING:
    'Tài khoản của bạn không có email nên không thể khôi phục mật khẩu',
  RESET_PASSWORD_SEND_SUCCESFULLY:
    'Vui lòng kiểm tra email để nhận chỉ dẫn tiếp theo',
  RESET_PASSWORD_SEND_FAILED:
    'Hệ thống gửi email bị lỗi. Xin vui lòng thử lại sau',
  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default UserMessage;
