import $api from "@http/api";
import FolderRetrievalService from "@services/FolderRetrievalService/FolderRetrievalService";
import FolderDTO from "@entities/file/FolderDTO";
import FolderModel from "@entities/file/FolderModel";

export default class FileHierarchyCreationService {
  static async createEmptyFolder(parentFolderId: string, folderName: string): Promise<FolderModel | null> {
    const { data } = await $api.post<FolderDTO>("/File/CreateEmptyFolder", { parentFolderId, folderName });
    return FolderRetrievalService.processFolderDTO(data);
  }
}