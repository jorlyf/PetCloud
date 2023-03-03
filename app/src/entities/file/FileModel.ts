import FolderModel from "@entities/file/FolderModel";

export default interface FileModel {
  name: string;
  path: string;
  parentPath: string | null;
}