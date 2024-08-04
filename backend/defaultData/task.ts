import ITask from '@/backend/models/data/ITask';
import { ITaskError } from '@/backend/models/messages/ITaskMessage';

export const DefaultTaskValue: ITask = {
  taskNo: '',
  taskName: '',
  taskDescription: '',
};

export const DefaultTaskErrorValue: ITaskError = {
  status: true,
  taskNoError: null,
  systemError: null,
};

export function TaskEditDefaultValue(data: ITask): ITask {
  const editData: ITask = {
    taskNo: data.taskNo,
    taskName: data.taskName,
    taskDescription: data.taskDescription,
  };

  return editData;
}
