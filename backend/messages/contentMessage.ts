import { IContentMessage } from '@/backend/models/messages/IContentMessage';
import ContentCondition from '@/backend/validationSchema/content/contentCondition';

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

  CONTENT_NAME: {
    OVER_MAX_CHARACTER: `Tên nội dung dài quá ${ContentCondition.CONTENT_NAME.MAX} ký tự`,
    REQUIRED: 'Xin nhập tên nội dung',
  },

  CONTENT_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Mô tả dài quá ${ContentCondition.CONTENT_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },

  CONTENT_NOT_FOUND: 'Không tìm thấy nội dung này trên hệ thống',

  CONTENT_ADD_COMPLETED: 'Thêm nội dung thành công',
  CONTENT_ADD_FAILED: 'Thêm nội dung thất bại',

  CONTENT_EDIT_COMPLETED: 'Chỉnh sửa nội dung thành công',
  CONTENT_EDIT_FAILED: 'Chỉnh sửa nội dung thất bại',

  CONTENT_DELETE_COMPLETED: 'Xóa nội dung thành công',
  CONTENT_DELETE_FAILED: 'Xóa nội dung thất bại',
};

export default ContentMessage;
