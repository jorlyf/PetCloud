import FileDTO from "./FileDto";

export default interface FolderDTO {
  id: string;
  parentId: string | null;
  isRoot: boolean;
  name: string;
  childFolders: FolderDTO[];
  files: FileDTO[];
}