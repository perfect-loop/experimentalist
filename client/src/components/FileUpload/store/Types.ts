export interface FileData {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface IStateNotStarted {
  kind: "not_started";
}

interface IStateErrorUpload {
  kind: "error";
  message: string;
}

export type IState = IStateNotStarted | IStateErrorUpload;

export const notStarted = (): IStateNotStarted => {
  return {
    kind: "not_started",
  };
};

export const error = (message: string): IStateErrorUpload => {
  return {
    kind: "error",
    message,
  };
};

export const fileExtension = (fileName: string) => {
  return fileName
    ?.split(".")
    ?.pop()
    ?.toLowerCase();
};

export const isCSVFile = (fileName: string): boolean => fileExtension(fileName) === "csv";
