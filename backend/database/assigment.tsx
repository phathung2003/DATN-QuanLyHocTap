import { TableName } from '../globalVariable';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/backend/database/firebase';
import {
  ITask,
  IAssignmentSumarry,
  IChildrenAssignmentList,
} from '../models/data/IAssignment';

export async function AddAssignmenToChildren(
  task: string[],
  parentID: string,
  childrenID: string,
  deadline: Date,
): Promise<boolean> {
  const statusTasks = task.map((task) => ({
    task,
    status: false,
  }));

  const baseURL = `${TableName.USER}/${parentID}/${TableName.CHILDREN}/${childrenID}/${TableName.ASSIGNMENT}`;
  const assignmentCollection = collection(db, baseURL);

  const startOfDay = new Date(deadline.setHours(0, 0, 0, 0));
  const startTimestamp = Timestamp.fromDate(startOfDay);

  // Đặt mốc thời gian cuối ngày
  const endOfDay = new Date(deadline.setHours(23, 59, 59, 999));
  const endTimestamp = Timestamp.fromDate(endOfDay);

  // Tạo truy vấn để kiểm tra deadline
  const assignmentQuery = query(
    assignmentCollection,
    where('deadline', '>=', startTimestamp),
    where('deadline', '<=', endTimestamp),
  );
  // Thực hiện truy vấn
  const assignmentDocuments = await getDocs(assignmentQuery);
  if (assignmentDocuments.empty) {
    // Nếu không có document nào trùng, thêm mới
    await addDoc(assignmentCollection, {
      taskList: statusTasks,
      deadline,
    });
  } else {
    assignmentDocuments.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        taskList: arrayUnion(...statusTasks),
      });
    });
  }

  return true;
}

export async function GetAssignment(parentID: string) {
  try {
    const baseURL = `${TableName.USER}/${parentID}/${TableName.CHILDREN}`;
    const childrenCollection = collection(db, baseURL);
    const childrenDocuments = await getDocs(childrenCollection);
    const childrenList = await Promise.all(
      childrenDocuments.docs.map(async (doc) => await TaskData(doc, baseURL)),
    );
    if (childrenList.length === 0) {
      return [];
    }

    return childrenList;
  } catch {
    return [];
  }
}

async function TaskData(doc, baseURL): Promise<IChildrenAssignmentList> {
  const assignmentURL = `${baseURL}/${doc.id}/${TableName.ASSIGNMENT}`;

  const assignmentCollection = collection(db, assignmentURL);
  const assignmentDocuments = await getDocs(assignmentCollection);
  const assignmentList: IAssignmentSumarry[] = await Promise.all(
    assignmentDocuments.docs.map(async (doc) => {
      const task = await AssignmentDetail(doc);
      return {
        deadline: doc.data().deadline.toDate(),
        completed: task.complete,
        taskList: task.taskList,
      };
    }),
  );

  return {
    childrenID: doc.id,
    assignment: assignmentList,
  };
}

async function AssignmentDetail(doc) {
  const taskList = doc.data().taskList;
  let complete = 0;
  const updatedTaskList: ITask[] = await Promise.all(
    taskList.map(async (item) => {
      const url = item.task;

      const taskName = await GetUnitName(url);
      if (item.status) {
        complete++;
      }
      return {
        status: item.status,
        task: taskName,
      };
    }),
  );
  return {
    complete,
    taskList: updatedTaskList,
  };
}

async function GetUnitName(taskURL: string): Promise<string> {
  const unitRef = doc(db, taskURL);
  const unitDoc = await getDoc(unitRef);
  if (unitDoc.exists()) {
    return unitDoc.data().unitName;
  } else {
    return 'Không xác đinh';
  }
}
