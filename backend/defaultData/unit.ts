import IUnit from '@/backend/models/data/IUnit';
import { IUnitError } from '@/backend/models/messages/IUnitMessage';

export const DefaultUnitValue: IUnit = {
  courseID: '',
  unitName: '',
  unitNo: 0,
  unitDescription: null,
  unitUploadDate: null,
  unitLastEditDate: null,
};

export const DefaultUnitErrorValue: IUnitError = {
  status: true,
  courseIDError: null,
  unitNameError: null,
  unitDescriptionError: null,
  systemError: null,
};
