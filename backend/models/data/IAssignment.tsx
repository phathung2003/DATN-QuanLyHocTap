export interface IAssignment {
  childrenID?: string;
  task: [
    {
      task: string;
      status: boolean;
    },
  ];
  deadline: Date;
  totalCompletion?: number;
}

export interface IAssignmentError {
  status: boolean;
  notChooseTask: string | null;
  systemError: string | null;
}

export interface IChildrenAssignmentList {
  childrenID: string;
  assignment: IAssignmentSumarry[];
}

export interface IAssignmentSumarry {
  deadline: Date;
  completed: number;
  taskList: ITask[];
}

export interface ITask {
  task: string;
  status: boolean;
}
