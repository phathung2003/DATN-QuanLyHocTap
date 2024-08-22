export default interface IUnit {
  courseID?: string;
  unitID?: string;
  unitName: string;
  unitNo: number;
  unitDescription: string | null;
  unitUploadDate?: Date | null | string;
  unitLastEditDate?: Date | null | string;
}
