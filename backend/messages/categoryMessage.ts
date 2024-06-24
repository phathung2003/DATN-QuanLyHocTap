import { ICategoryMessage } from '@/backend/models/messages/ICategoryMessage';

const CategoryMessage: ICategoryMessage = {
  CATEGORY_EXIST: 'Đã tồn tại loại này',
  CATEGORY_ID_EXIST: 'Đã có mã loại này trên hệ thống',
  CATEGORY_NAME_EXIST: 'Đã có tên loại này trên hệ thống',
  CATEGORY_ADD_COMPLETE: 'Thêm loại thành công',
  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default CategoryMessage;
