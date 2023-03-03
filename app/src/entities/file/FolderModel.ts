import File from "@entities/file/FileModel";

export default interface FolderModel {
  name: string;
  path: string;
  isRoot: boolean;
  childFolders: FolderModel[];
  childFiles: File[];
  parentPath: string | null;
}