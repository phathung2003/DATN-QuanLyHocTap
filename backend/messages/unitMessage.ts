import { IUnitMessage } from '@/backend/models/messages/IUnitMessage';
import CourseCondition from '@/backend/validationSchema/course/courseCondition';

const UnitMessage: IUnitMessage = {
  UNIT_NO: {
    NOT_A_NUMBER: 'Dữ liệu phải là số',
    NEGATIVE_CHARACTER: `Số thứ tự bài phải lớn hơn 0`,
    REQUIRED: 'Xin hãy nhập số bài học',
  },

  UNIT_NAME: {
    OVER_MAX_CHARACTER: `Tên bài học dài quá ${CourseCondition.COURSE_NAME.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập tên bài học',
  },

  UNIT_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Tên mô tả dài quá ${CourseCondition.COURSE_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },

  COURSE_NOT_FOUND: 'Không tìm thấy khóa học này trên hệ thống',
  UNIT_ADD_COMPLETE: 'Thêm bài học thành công',
  UNIT_ADD_FAILED: 'Thêm bài học thất bại',
  UNIT_EDIT_NOT_FOUND: 'Không tìm thấy bài học này trên hệ thống',
  UNIT_EDIT_COMPLETE: 'Chỉnh sửa bài học thành công',
  UNIT_DELETE_COMPLETE: 'Xóa bài học thành công',

  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default UnitMessage;
