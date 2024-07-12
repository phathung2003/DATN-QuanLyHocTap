import { ISubjectMessage } from '@/backend/models/messages/ISubjectMessage';
import CategoryCondition from '@/backend/validationSchema/category/categoryCondition';

const SubjectMessage: ISubjectMessage = {
  SUBJECT_NAME: {
    OVER_MAX_CHARACTER: `Tên loại dài quá ${CategoryCondition.CATEGORY_NAME.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập tên môn học',
  },
  SUBJECT_TYPE: {
    REQUIRED: 'Xin hãy chọn loại',
  },
  SUBJECT_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Mô tả dài quá ${CategoryCondition.CATEGORY_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },
  SUBJECT_IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png, gif).',
    REQUIRED: 'Xin hãy chọn hình',
  },
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
