import { ISubjectMessage } from '@/backend/models/messages/ISubjectMessage';
import SubjectCondition from '@/backend/validationSchema/subject/subjectCondition';

const SubjectMessage: ISubjectMessage = {
  SUBJECT_ID: {
    ALREADY_EXIST: 'Đã có mã môn học này trên hệ thống',
  },

  SUBJECT_NAME: {
    OVER_MAX_CHARACTER: `Tên môn học dài quá ${SubjectCondition.SUBJECT_NAME.MAX} ký tự`,
    ALREADY_EXIST: 'Đã có tên môn này trên hệ thống',
    REQUIRED: 'Xin hãy nhập tên môn học',
  },

  SUBJECT_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Mô tả dài quá ${SubjectCondition.SUBJECT_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },

  SUBJECT_IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png, gif).',
    REQUIRED: 'Xin hãy chọn hình',
  },

  SUBJECT_EXIST: 'Đã tồn tại môn học này',
  SUBJECT_NOT_FOUND: 'Không tìm thấy môn học cần chỉnh sửa',

  SUBJECT_ADD_COMPLETED: 'Thêm môn học thành công',
  SUBJECT_ADD_FAILED: 'Thêm môn học thất bại',

  SUBJECT_EDIT_COMPLETED: 'Chỉnh sửa môn học thành công',
  SUBJECT_EDIT_FAILED: 'Chỉnh sửa môn học thất bại',

  SUBJECT_DELETE_COMPLETED: 'Xóa môn học thành công',
  SUBJECT_DELETE_FAILED: 'Xoá môn học thất bại',
};

export default SubjectMessage;
