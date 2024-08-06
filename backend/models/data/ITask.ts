export default interface ITask {
  taskID?: string;
  taskNo: number;
  taskName: string;
  taskDescription: string;
  taskUploadDate?: Date;
  taskLastEditDate?: Date | null;
}
