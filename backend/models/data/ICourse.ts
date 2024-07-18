export default interface ICourse {
  courseID?: string;
  courseAuthor?: string;
  courseAuthorID: string;
  courseGrade: string;
  courseSubject: string;
  courseName: string;
  courseDescription: string | null;
  courseImage: string | null;
  courseFile?: File | string;
  courseUploadDate?: Date | null;
  courseLastEditDate?: Date | null;
}