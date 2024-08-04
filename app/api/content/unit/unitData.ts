import IUnit from '@/backend/models/data/IUnit';
import { CheckDataInputNeedLogin } from '@/app/api/checkData';

export default async function CheckUnitData(request) {
  try {
    const courseIDRequest = request.nextUrl.searchParams.get('courseID');
    const optionField = ['unitDescription'];
    const requireField = ['unitName', 'unitNo'];

    const result = await CheckDataInputNeedLogin(
      request,
      requireField,
      optionField,
    );

    if (!result || !courseIDRequest) {
      return false;
    }

    const unitData = UnitData(result.data);
    if (!unitData) {
      return false;
    }
    return { token: result.token, data: unitData, courseID: courseIDRequest };
  } catch {
    return false;
  }
}

//Format
function UnitData(dataInput): IUnit | null {
  try {
    const data: IUnit = {
      courseID: dataInput.courseID,
      unitName: dataInput.unitName,
      unitNo: dataInput.unitNo,
      unitDescription: dataInput.unitDescription,
    };
    return data;
  } catch {
    return null;
  }
}
