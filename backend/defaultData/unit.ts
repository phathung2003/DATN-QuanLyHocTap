import IUnit from '@/backend/models/data/IUnit';
import { IUnitError } from '@/backend/models/messages/IUnitMessage';

export function DefaultUnitValue(): IUnit {
  return {
    courseID: '',
    unitName: '',
    unitNo: NaN,
    unitDescription: '',
    unitUploadDate: null,
    unitLastEditDate: null,
  };
}

export function DefaultUnitErrorValue(): IUnitError {
  return {
    status: true,
    courseIDError: null,
    unitNoError: null,
    systemError: null,
  };
}

export function UnitEditDefaultValue(data: IUnit): IUnit {
  return {
    unitName: data.unitName,
    unitNo: data.unitNo,
    unitDescription: data.unitDescription,
    unitUploadDate: data.unitUploadDate,
    unitLastEditDate: data.unitLastEditDate,
  };
}
