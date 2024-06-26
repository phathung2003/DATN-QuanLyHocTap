import { ISubjectMessage } from '@/backend/models/messages/ISubjectMessage';

const SubjectMessage: ISubjectMessage = {
  SUBJECT_EXIST: 'Đã tồn tại loại này',
  SUBJECT_ID_EXIST: 'Đã có mã loại này trên hệ thống',
  SUBJECT_NAME_EXIST: 'Đã có tên loại này trên hệ thống',
  SUBJECT_ADD_COMPLETE: 'Thêm loại thành công',
  SUBJECT_EDIT_NOT_FOUND: 'Không tìm thấy mã loại cần chỉnh sửa',
  SUBJECT_EDIT_COMPLETE: 'Chỉnh sửa loại thành công',
  SUBJECT_DELETE_COMPLETE: 'Xóa loại thành công',
  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default SubjectMessage;
