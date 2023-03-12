import { FileType } from "./FileModel";

export default interface FileDTO {
  id: string;
  folderId: string;
  type: FileType;
  name: string;
}