import { IUnitMessage } from '@/backend/models/messages/IUnitMessage';
import CourseCondition from '@/backend/validationSchema/course/courseCondition';

const UnitMessage: IUnitMessage = {
  UNIT_NO: {
    NOT_A_NUMBER: 'Dữ liệu phải là số',
    NEGATIVE_NUMBER: 'Số thứ tự bài phải lớn hơn 0',
    ALREADY_EXIST: 'Số bài học này đã tồn tại',
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

  UNIT_NOT_FOUND: 'Không tìm thấy bài học này trên hệ thống',

  UNIT_ADD_COMPLETED: 'Thêm bài học thành công',
  UNIT_ADD_FAILED: 'Thêm bài học thất bại',

  UNIT_EDIT_COMPLETED: 'Chỉnh sửa bài học thành công',
  UNIT_EDIT_FAILED: 'Chỉnh sửa bài học thất bại',

  UNIT_DELETE_COMPLETED: 'Xóa bài học thành công',
  UNIT_DELETE_FAILED: 'Xóa bài học thất bại',
};

export default UnitMessage;
