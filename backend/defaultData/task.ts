import ITask from '@/backend/models/data/ITask';
import { ITaskError } from '@/backend/models/messages/ITaskMessage';

export function DefaultTaskValue(): ITask {
  return {
    taskNo: NaN,
    taskName: '',
    taskDescription: '',
  };
}

export function DefaultTaskErrorValue(): ITaskError {
  return {
    status: true,
    taskNoError: null,
    systemError: null,
  };
}

export function TaskEditDefaultValue(data: ITask): ITask {
  return {
    taskNo: data.taskNo,
    taskName: data.taskName,
    taskDescription: data.taskDescription,
  };
}
