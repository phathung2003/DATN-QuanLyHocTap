import ICategory from '@/backend/models/data/ICategory';
import { ICategoryError } from '@/backend/models/messages/ICategoryMessage';

export const DefaultCategoryValue: ICategory = {
  categoryType: 'Default',
  categoryName: '',
  categoryDescription: '',
  categoryImage: undefined,
};

export const DefaultCategoryErrorValue: ICategoryError = {
  status: true,
  categoryNameError: null,
  categoryImageError: null,
  systemError: null,
};
