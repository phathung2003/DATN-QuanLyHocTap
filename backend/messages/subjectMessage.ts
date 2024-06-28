import { ISubjectMessage } from '@/backend/models/messages/ISubjectMessage';

const SubjectMessage: ISubjectMessage = {
  SUBJECT_EXIST: 'Đã tồn tại môn học này',
  SUBJECT_ID_EXIST: 'Đã có mã môn học này trên hệ thống',
  SUBJECT_NAME_EXIST: 'Đã có tên môn này trên hệ thống',
  SUBJECT_ADD_COMPLETE: 'Thêm môn học thành công',
  SUBJECT_EDIT_NOT_FOUND: 'Không tìm thấy mã môn học cần chỉnh sửa',
  SUBJECT_EDIT_COMPLETE: 'Chỉnh sửa  môn học thành công',
  SUBJECT_DELETE_COMPLETE: 'Xóa  môn học thành công',
  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default SubjectMessage;
