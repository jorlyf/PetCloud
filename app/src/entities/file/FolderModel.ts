import File from "@entities/file/FileModel";

export default interface FolderModel {
  id: string;
  parentId: string | null;
  isRoot: boolean;
  name: string;
  path: string;
  childFolders: FolderModel[];
  files: File[];
}