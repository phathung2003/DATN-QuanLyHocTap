export default interface IUnit {
  courseID: string;
  unitName: string;
  unitNo: number;
  unitDescription: string | null;
  unitUploadDate?: Date | null;
  unitLastEditDate?: Date | null;
}
