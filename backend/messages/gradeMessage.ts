import { IGradeMessage } from '@/backend/models/messages/IGradeMessage';
import CategoryCondition from '@/backend/validationSchema/category/categoryCondition';

const GRADEMessage: IGradeMessage = {
  GRADE_NAME: {
    OVER_MAX_CHARACTER: `Tên loại dài quá ${CategoryCondition.CATEGORY_NAME.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập tên môn học',
  },
  GRADE_TYPE: {
    REQUIRED: 'Xin hãy chọn loại',
  },
  GRADE_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Mô tả dài quá ${CategoryCondition.CATEGORY_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },
  GRADE_IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png, gif).',
    REQUIRED: 'Xin hãy chọn hình',
  },
  GRADE_EXIST: 'Đã tồn tại lớp này',
  GRADE_ID_EXIST: 'Đã có mã lớp này trên hệ thống',
  GRADE_NAME_EXIST: 'Đã có tên lớp này trên hệ thống',
  GRADE_ADD_COMPLETE: 'Thêm lớp thành công',
  GRADE_EDIT_NOT_FOUND: 'Không tìm thấy mã lớp cần chỉnh sửa',
  GRADE_EDIT_COMPLETE: 'Chỉnh sửa lớp thành công',
  GRADE_DELETE_COMPLETE: 'Xóa lớp thành công',
  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default GRADEMessage;
