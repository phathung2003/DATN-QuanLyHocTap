import IUnit from '@/backend/models/data/IUnit';
import { IUnitError } from '@/backend/models/messages/IUnitMessage';

export const DefaultUnitValue: IUnit = {
  courseID: '',
  unitName: '',
  unitNo: NaN,
  unitDescription: '',
  unitUploadDate: null,
  unitLastEditDate: null,
};

export const DefaultUnitErrorValue: IUnitError = {
  status: true,
  courseIDError: null,
  unitNoError: null,
  systemError: null,
};

export function UnitEditDefaultValue(data: IUnit): IUnit {
  const editData: IUnit = {
    unitName: data.unitName,
    unitNo: data.unitNo,
    unitDescription: data.unitDescription,
    unitUploadDate: data.unitUploadDate,
    unitLastEditDate: data.unitLastEditDate,
  };

  return editData;
}
