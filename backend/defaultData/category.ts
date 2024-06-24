import { ICategoryError } from '@/backend/models/messages/ICategoryMessage';

const DefaultCategoryErrorValue: ICategoryError = {
  status: true,
  categoryIDError: null,
  categoryNameError: null,
  systemError: null,
};

export default DefaultCategoryErrorValue;
