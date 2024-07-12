export interface ISubject {
  subjectID: string;
  subjectName: string;
  subjectDescription: string | null;
  subjectImage: string;
  subjectFile?: File | string;
}
