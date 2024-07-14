import { ICategoryMessage } from '@/backend/models/messages/ICategoryMessage';
import CategoryCondition from '@/backend/validationSchema/category/categoryCondition';

const CategoryMessage: ICategoryMessage = {
  CATEGORY_NAME: {
    OVER_MAX_CHARACTER: `Tên loại dài quá ${CategoryCondition.CATEGORY_NAME.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập tên loại',
  },
  CATEGORY_TYPE: {
    REQUIRED: 'Xin hãy chọn loại',
  },
  CATEGORY_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Mô tả dài quá ${CategoryCondition.CATEGORY_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },
  CATEGORY_IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png).',
    REQUIRED: 'Xin hãy chọn hình',
  },
  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default CategoryMessage;
