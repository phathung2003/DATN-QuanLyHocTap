import { IAssignmentError } from '../models/data/IAssignment';

export function DefaultAssignmentErrorValue(): IAssignmentError {
  return {
    status: true,
    notChooseTask: null,
    systemError: null,
  };
}
