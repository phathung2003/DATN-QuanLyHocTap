import { IGradeMessage } from '@/backend/models/messages/IGradeMessage';
import GradeCondition from '@/backend/validationSchema/grade/gradeCondition';

const GRADEMessage: IGradeMessage = {
  GRADE_ID: {
    ALREADY_EXIST: 'Đã có mã cấp bậc này trên hệ thống',
  },

  GRADE_NAME: {
    OVER_MAX_CHARACTER: `Tên cấp bậc dài quá ${GradeCondition.GRADE_NAME.MAX} ký tự`,
    ALREADY_EXIST: 'Đã có tên cấp bậc này trên hệ thống',
    REQUIRED: 'Xin hãy nhập tên cấp bậc',
  },

  GRADE_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Mô tả dài quá ${GradeCondition.GRADE_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },

  GRADE_IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png, gif).',
    REQUIRED: 'Xin hãy chọn hình',
  },

  GRADE_EXIST: 'Đã tồn tại cấp bậc này',
  GRADE_NOT_FOUND: 'Không tìm thấy mã cấp bậc cần chỉnh sửa',

  GRADE_ADD_COMPLETED: 'Thêm cấp bậc thành công',
  GRADE_ADD_FAILED: 'Thêm cấp bậc thất bại',

  GRADE_EDIT_COMPLETED: 'Chỉnh sửa cấp bậc thành công',
  GRADE_EDIT_FAILED: 'Chỉnh sửa cấp bậc thành công',

  GRADE_DELETE_COMPLETED: 'Xóa cấp bậc thành công',
  GRADE_DELETE_FAILED: 'Xóa cấp bậc thành công',
};

export default GRADEMessage;
