import IUnit from '@/backend/models/data/IUnit';

export default function UnitData(dataInput): IUnit | null {
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
