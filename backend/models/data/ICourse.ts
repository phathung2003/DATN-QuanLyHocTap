import IUnit from './IUnit';

export default interface ICourse {
  courseID?: string;
  courseAuthor?: string;
  courseAuthorID: string;
  courseGrade: string;
  courseGradeName?: string | null;
  courseSubject: string;
  courseSubjectName?: string | null;
  courseName: string;
  courseDescription: string | null;
  courseImage: string | null;
  courseFile?: File | string;
  courseUploadDate?: Date | string;
  courseLastEditDate?: Date | null | string;
  unit?: number;
  unitList?: IUnit | IUnit[] | null;
}
