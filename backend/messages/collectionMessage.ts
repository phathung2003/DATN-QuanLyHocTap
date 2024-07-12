import { ICollectionMessage } from '@/backend/models/messages/ICollectionMessage';
import CollectionCondition from '@/backend/validationSchema/collection/collectionCondition';

const CollectionMessage: ICollectionMessage = {
  COLLECTION_NAME: {
    OVER_MAX_CHARACTER: `Tên loại dài quá ${CollectionCondition.COLLECTION_NAME.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập tên danh mục bài học',
  },

  COLLECTION_GRADE: {
    REQUIRED: 'Xin hãy chọn lớp',
  },

  COLLECTION_SUBJECT: {
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

  COLLECTION_ADD_COMPLETE: 'Thêm danh mục bài học thành công',
  COLLECTION_EDIT_NOT_FOUND: 'Không tìm thấy danh mục bài học trên hệ thống',
  COLLECTION_EDIT_COMPLETE: 'Chỉnh sửa danh mục bài học thành công',
  COLLECTION_DELETE_COMPLETE: 'Xóa danh mục bài học thành công',

  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default CollectionMessage;
