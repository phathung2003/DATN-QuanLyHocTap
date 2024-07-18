import { IUnitMessage } from '@/backend/models/messages/IUnitMessage';
import CourseCondition from '@/backend/validationSchema/course/courseCondition';

const UnitMessage: IUnitMessage = {
  UNIT_NAME: {
    OVER_MAX_CHARACTER: `Tên khóa học dài quá ${CourseCondition.COURSE_NAME.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập tên danh mục bài học',
  },

  UNIT_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Tên mô tả dài quá ${CourseCondition.COURSE_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },

  COURSE_NOT_FOUND: 'Không tìm thấy khóa học này trên hệ thống',
  UNIT_ADD_COMPLETE: 'Thêm nội dung bài học thành công',
  UNIT_ADD_FAILED: 'Thêm nội dung bài học thất bại',
  UNIT_EDIT_NOT_FOUND: 'Không tìm thấy nội dung bài học này trên hệ thống',
  UNIT_EDIT_COMPLETE: 'Chỉnh sửa nội dung bài học thành công',
  UNIT_DELETE_COMPLETE: 'Xóa nội dung bài học thành công',

  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default UnitMessage;
