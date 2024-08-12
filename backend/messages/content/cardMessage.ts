import { ICardMessage } from '@/backend/models/messages/content/ICardMessage';
import CardCondition from '@/backend/validationSchema/content/card/cardCondition';

const CardMessage: ICardMessage = {
  TEXT: {
    REQUIRED: 'Xin hãy nhập từ',
    OVER_MAX_CHARACTER: `Từ dài quá ${CardCondition.TEXT.MAX} ký tự`,
  },

  IMAGE: {
    WRONG_FILE: 'Tệp phải là hình ảnh (jpeg, jpg, png, gif).',
    REQUIRED: 'Xin hãy tải hình mặt trước',
  },

  MISING_BOTH_INFO: 'Có ít nhất 1 trường dữ liệu được nhập',
};

export default CardMessage;
