export default interface ITask {
  taskID?: string;
  taskNo: number | string;
  taskName: string;
  taskDescription: string;
  taskUploadDate?: Date;
  taskLastEditDate?: Date | null;
}
