import { ICollectionMessage } from '@/backend/models/messages/ICollectionMessage';
import CollectionCondition from '@/backend/validationSchema/collection/collectionCondition';

const CollectionMessage: ICollectionMessage = {
  COLLECTION_NAME: {
    OVER_MAX_CHARACTER: `Tên khóa học dài quá ${CollectionCondition.COLLECTION_NAME.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập tên danh mục bài học',
  },

  COLLECTION_GRADE: {
    NOT_EXIST: 'Lớp này không tồn tại trên hệ thống',
    REQUIRED: 'Xin hãy chọn lớp',
  },

  COLLECTION_SUBJECT: {
    NOT_EXIST: 'Môn học này không tồn tại trên hệ thống',
    REQUIRED: 'Xin hãy chọn môn học',
  },

  COLLECTION_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Tên mô tả dài quá ${CollectionCondition.COLLECTION_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },

  COLLECTION_IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png).',
    REQUIRED: 'Xin hãy chọn hình',
  },

  COLLECTION_ADD_COMPLETE: 'Thêm khóa học thành công',
  COLLECTION_ADD_FAILED: 'Thêm khóa học học thất bại',
  COLLECTION_EDIT_NOT_FOUND: 'Không tìm thấy khóa học này trên hệ thống',
  COLLECTION_EDIT_COMPLETE: 'Chỉnh sửa khóa học thành công',
  COLLECTION_DELETE_COMPLETE: 'Xóa khóa học thành công',

  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default CollectionMessage;
