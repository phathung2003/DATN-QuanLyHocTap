import { ICourseMessage } from '@/backend/models/messages/ICourseMessage';
import CourseCondition from '@/backend/validationSchema/course/courseCondition';

const CourseMessage: ICourseMessage = {
  COURSE_NAME: {
    OVER_MAX_CHARACTER: `Tên khóa học dài quá ${CourseCondition.COURSE_NAME.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập tên khóa học',
  },

  COURSE_GRADE: {
    NOT_EXIST: 'Lớp này không tồn tại trên hệ thống',
    REQUIRED: 'Xin hãy chọn cấp độ',
  },

  COURSE_SUBJECT: {
    NOT_EXIST: 'Môn học này không tồn tại trên hệ thống',
    REQUIRED: 'Xin hãy chọn môn học',
  },

  COURSE_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Tên mô tả dài quá ${CourseCondition.COURSE_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },

  COURSE_IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png).',
    REQUIRED: 'Xin hãy chọn hình',
  },

  COURSE_NOT_FOUND: 'Không tìm thấy khóa học này trên hệ thống',

  COURSE_ADD_COMPLETED: 'Thêm khóa học thành công',
  COURSE_ADD_FAILED: 'Thêm khóa học thất bại',

  COURSE_EDIT_COMPLETED: 'Chỉnh sửa khóa học thành công',
  COURSE_EDIT_FAILED: 'Chỉnh sửa khóa học thành công',

  COURSE_DELETE_COMPLETED: 'Xóa khóa học thành công',
  COURSE_DELETE_FAILED: 'Xóa khóa học thành công',
};

export default CourseMessage;
