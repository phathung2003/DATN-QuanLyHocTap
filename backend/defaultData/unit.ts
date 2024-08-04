import IUnit from '@/backend/models/data/IUnit';
import { IUnitError } from '@/backend/models/messages/IUnitMessage';

export const DefaultUnitValue: IUnit = {
  courseID: '',
  unitName: '',
  unitNo: '',
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
