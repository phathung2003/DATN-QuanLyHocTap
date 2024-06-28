import { IGradeMessage } from '@/backend/models/messages/IGradeMessage';

const SubjectMessage: IGradeMessage = {
  GRADE_EXIST: 'Đã tồn tại lớp này',
  GRADE_ID_EXIST: 'Đã có mã lớp này trên hệ thống',
  GRADE_NAME_EXIST: 'Đã có tên lớp này trên hệ thống',
  GRADE_ADD_COMPLETE: 'Thêm lớp thành công',
  GRADE_EDIT_NOT_FOUND: 'Không tìm thấy mã lớp cần chỉnh sửa',
  GRADE_EDIT_COMPLETE: 'Chỉnh sửa lớp thành công',
  GRADE_DELETE_COMPLETE: 'Xóa lớp thành công',
  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default SubjectMessage;
