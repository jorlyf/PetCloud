export enum FileType {
  undefined,
  text,
  picture,
  video
}

export default interface FileModel {
  id: string;
  folderId: string;
  type: FileType;
  name: string;
}