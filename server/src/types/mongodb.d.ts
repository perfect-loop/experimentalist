export default interface BulkWriteError {
  code: number;
  insertedDocs: any[];
  name: "BulkWriteError";
  writeErrors: any[];
  message: string;
}
