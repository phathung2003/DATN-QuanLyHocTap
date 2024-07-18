import { IContentMessage } from '@/backend/models/messages/IContentMessage';

const UnitMessage: IContentMessage = {
  CONTENT_TYPE: {
    REQUIRED: 'Xin hãy chọn loại bài học',
  },

  CONTENT_TASKNO: {
    REQUIRED: 'Xin hãy đánh số thứ tự',
  },

  COURSE_NOT_FOUND: 'Không tìm thấy khóa học này trên hệ thống',
  UNIT_NOT_FOUND: 'Không tìm thấy bài học này trên hệ thống',
  CONTENT_ADD_COMPLETE: 'Thêm nội dung thành công',
  CONTENT_ADD_FAILED: 'Thêm nội dung thất bại',
  CONTENT_EDIT_COMPLETE: 'Chỉnh sửa nội dung thất bại',
  CONTENT_DELETE_COMPLETE: 'Xóa nội dung thất bại',

  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default UnitMessage;
