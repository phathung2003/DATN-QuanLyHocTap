export default interface IUnit {
  collectionID: string;
  unitName: string;
  unitNo: number;
  unitDescription: string | null;
  unitUploadDate?: Date | null;
  unitLastEditDate?: Date | null;
}
