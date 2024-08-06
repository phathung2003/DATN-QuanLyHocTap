import IUnit from '@/backend/models/data/IUnit';
import { CheckDataInputNeedLogin } from '@/app/api/checkData';

//Kiểm tra dữ liệu
export default async function CheckUnitData(request) {
  const courseIDRequest = request.nextUrl.searchParams.get('courseID');
  const optionField = ['unitDescription'];
  const requireField = ['unitName'];

  try {
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
  //Kiểm tra unitNo có null không
  const unitNo = dataInput.unitNo ?? NaN;
  if (!isNaN(unitNo) && isNaN(Number(dataInput.unitNo))) {
    return null;
  }

  try {
    const data: IUnit = {
      unitName: dataInput.unitName,
      unitNo: Number(unitNo),
      unitDescription: dataInput.unitDescription,
    };
    return data;
  } catch {
    return null;
  }
}
