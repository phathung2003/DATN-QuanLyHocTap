export interface IGrade {
  gradeID: string;
  gradeName: string;
  gradeDescription: string | null;
  gradeImage: string;
  gradeFile?: File | string;
}
