import { IContentMessage } from '@/backend/models/messages/IContentMessage';

const ContentMessage: IContentMessage = {
  CONTENT_TYPE: {
    REQUIRED: 'Xin hãy chọn loại nội dung',
    NOT_EXIST: 'Không hỗ trợ loại nội dung này trên hệ thống',
  },

  CONTENT_NO: {
    NOT_A_NUMBER: 'Số thứ tự phần nội dung phải là số',
    NEGATIVE_NUMBER: 'Số thứ tự phần nội dung phải lớn hơn 0',
    ALREADY_EXIST: 'Đã có phần nội dung ở số thứ tự này',
    REQUIRED: 'Xin nhập thứ tự phần nội dung',
  },

  CONTENT_POSITION: {
    NOT_A_NUMBER: 'Số thứ tự nội dung phải là số',
    NEGATIVE_NUMBER: 'Số thứ tự nội dung phải lớn hơn 0',
    ALREADY_EXIST: 'Đã có nội dung ở số thứ tự này',
    REQUIRED: 'Xin nhập thứ tự nội dung',
  },

  CONTENT_NOT_FOUND: 'Không tìm thấy nội dung này trên hệ thống',

  CONTENT_ADD_COMPLETE: 'Thêm nội dung thành công',
  CONTENT_ADD_FAILED: 'Thêm nội dung thất bại',

  CONTENT_EDIT_COMPLETE: 'Chỉnh sửa nội dung thành công',
  CONTENT_EDIT_FAILED: 'Chỉnh sửa nội dung thất bại',

  CONTENT_DELETE_COMPLETE: 'Xóa nội dung thành công',

  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default ContentMessage;
