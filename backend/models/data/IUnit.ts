export default interface IUnit {
  courseID?: string;
  unitName: string;
  unitNo: string;
  unitDescription: string | null;
  unitUploadDate?: Date | null;
  unitLastEditDate?: Date | null;
}
