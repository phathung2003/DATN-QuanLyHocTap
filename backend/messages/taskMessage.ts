import { ITaskMessage } from '@/backend/models/messages/ITaskMessage';
import TaskCondition from '@/backend/validationSchema/task/taskCondition';

const TaskMessage: ITaskMessage = {
  TASK_NO: {
    NOT_A_NUMBER: 'Dữ liệu phải là số',
    NEGATIVE_NUMBER: `Số thứ tự bài phải lớn hơn 0`,
    REQUIRED: 'Xin hãy nhập số bài học',
  },

  TASK_NAME: {
    OVER_MAX_CHARACTER: `Tên bài dài quá ${TaskCondition.TASK_NAME.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập tên bài học',
  },

  TASK_DESCRIPTION: {
    OVER_MAX_CHARACTER: `Tên mô tả dài quá ${TaskCondition.TASK_DESCRIPTION.MAX} ký tự`,
    REQUIRED: 'Xin hãy nhập mô tả',
  },

  TASK_ADD_COMPLETE: 'Thêm bài học thành công',
  TASK_ADD_FAILED: 'Thêm bài học thất bại',
  TASK_NOT_FOUND: 'Không tìm thấy bài học này trên hệ thống',
  TASK_EDIT_COMPLETE: 'Chỉnh sửa bài học thành công',
  TASK_DELETE_COMPLETE: 'Xóa bài học thành công',

  SYSTEM_ERROR: 'Hệ thống hiện tại đang bị lỗi. Xin vui lòng thử lại sau',
};

export default TaskMessage;
