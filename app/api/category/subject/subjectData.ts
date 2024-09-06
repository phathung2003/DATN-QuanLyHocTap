import { ISubject } from '@/backend/models/data/ISubject';
import { CheckDataInputNeedLogin } from '@/app/api/checkData';

//Kiểm tra dữ liệu
export default async function CheckSubjectData(request: Request) {
  try {
    //Các trường có thể null
    const optionField = ['subjectImage', 'subjectDescription'];
    const requireField = ['subjectID', 'subjectName'];

    const result = await CheckDataInputNeedLogin(
      request,
      requireField,
      optionField,
    );

    if (!result) {
      return false;
    }

    const subjectData = SubjectData(result);
    if (!subjectData) {
      return false;
    }

    return { token: result.token, data: subjectData };
  } catch {
    return false;
  }
}

function SubjectData(dataInput) {
  try {
    const data: ISubject = {
      subjectID: dataInput.data.subjectID,
      subjectName: dataInput.data.subjectName,
      subjectDescription: dataInput.data.subjectDescription,
      subjectImage: dataInput.data.subjectImage,
    };
    return data;
  } catch {
    return false;
  }
}
