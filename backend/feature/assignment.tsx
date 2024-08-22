import { AddAssignmenToChildren } from '@/backend/database/assigment';
import { DefaultAssignmentErrorValue } from '../defaultData/assignment';
import AssignmentMessage from '../messages/assignmentMessage';
import SystemMessage from '../messages/systemMessage';
import { IAssignmentError } from '../models/data/IAssignment';
import { GetAssignment } from '@/backend/database/assigment';

//Đăng ký
export async function AddAssignment(
  task: string[],
  parentID: string,
  childrenID: string,
  deadline: Date,
  setError: React.Dispatch<React.SetStateAction<IAssignmentError>>,
) {
  const error = DefaultAssignmentErrorValue();

  if (task.length == 0) {
    error.status = false;
    error.notChooseTask = AssignmentMessage.NOT_CHOOSE_TASK;
    setError(error);
    return;
  }
  try {
    await AddAssignmenToChildren(task, parentID, childrenID, deadline);
    return window.location.reload();
  } catch {
    error.status = false;
    error.notChooseTask = SystemMessage.SYSTEM_ERROR;
    setError(error);
  }
}

export async function GetAssignmentList(parentID: string) {
  const data = await GetAssignment(parentID);

  if (Array.isArray(data)) {
    return data;
  }
  return [];
}
