import { CheckDataInputNeedLogin } from '@/app/api/checkData';
import ITask from '@/backend/models/data/ITask';
import { TableName } from '@/backend/globalVariable';
import { CheckIDExist } from '@/backend/database/generalFeature';

//Kiểm tra dữ liệu
export default async function CheckTaskData(request) {
  try {
    const unitFileID = request.nextUrl.searchParams.get('unitID');
    const courseFileID = request.nextUrl.searchParams.get('courseID');

    const optionField = ['taskDescription'];
    const requireField = ['taskName'];
    const result = await CheckDataInputNeedLogin(
      request,
      requireField,
      optionField,
    );

    if (!result || !unitFileID || !courseFileID) {
      return false;
    }

    //Kiểm tra khóa học có trên hệ thống hay không
    if (!(await CheckIDExist(TableName.COURSE, courseFileID))) {
      return false;
    }

    //Kiểm tra bài học có trên hệ thống hay không
    if (
      !(await CheckIDExist(
        `${TableName.COURSE}/${courseFileID}/${TableName.UNIT}`,
        unitFileID,
      ))
    ) {
      return false;
    }

    const taskData = TaskData(result.data);
    if (!taskData) {
      return false;
    }

    return {
      token: result.token,
      data: taskData,
      courseID: courseFileID,
      unitID: unitFileID,
    };
  } catch {
    return false;
  }
}

//Format dữ liệu
function TaskData(dataInput): ITask | null {
  //Kiểm tra unitNo có null không
  const taskNo = dataInput.taskNo ?? NaN;
  if (!isNaN(taskNo) && isNaN(Number(dataInput.taskNo))) {
    return null;
  }

  try {
    const data: ITask = {
      taskNo: Number(taskNo),
      taskName: dataInput.taskName,
      taskDescription: dataInput.taskDescription,
    };
    return data;
  } catch {
    return null;
  }
}
