import $api from "@http/api";
import FolderDTO from "@entities/file/FolderDTO";
import FolderModel from "@entities/file/FolderModel";
import FileDTO from "@entities/file/FileDto";
import FileModel from "@entities/file/FileModel";

export default class FolderRetrievalService {
  static async retrieveRoot(): Promise<FolderModel | null> {
    const { data } = await $api.get<FolderDTO>("/Retrieval/GetRootFolder");
    return FolderRetrievalService.processFolderDTO(data);
  }
  static async retrieveFolder(folderId: string): Promise<FolderModel | null> {
    const { data } = await $api.get<FolderDTO>(`/Retrieval/GetFolder?folderId=${folderId}`);
    return FolderRetrievalService.processFolderDTO(data);
  }

  static processFolderDTO(dto: FolderDTO): FolderModel {
    return {
      id: dto.id,
      parentId: dto.parentId,
      isRoot: dto.isRoot,
      name: dto.name,
      path: "",
      childFolders: dto.childFolders.map(x => FolderRetrievalService.processFolderDTO(x)),
      files: dto.files.map(x => FolderRetrievalService.processFileDTO(x))
    }
  }
  static processFileDTO(dto: FileDTO): FileModel {
    return {
      id: dto.id,
      folderId: dto.folderId,
      type: dto.type,
      name: dto.name
    }
  }
}