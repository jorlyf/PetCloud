import $api from "@http/api";
import FolderRetrievalService from "@services/FolderRetrievalService/FolderRetrievalService";
import FolderDTO from "@entities/file/FolderDTO";
import FolderModel from "@entities/file/FolderModel";
import FileModel from "@entities/file/FileModel";
import FileDTO from "@entities/file/FileDto";

export default class FileHierarchyCreationService {
  static async createEmptyFolder(parentFolderId: string, folderName: string): Promise<FolderModel | null> {
    const { data } = await $api.post<FolderDTO>(
      `/File/CreateEmptyFolder?parentFolderId=${parentFolderId}&folderName=${folderName}`);
    return FolderRetrievalService.processFolderDTO(data);
  }
  static async createEmptyFile(folderId: string, fileName: string): Promise<FileModel | null> {
    const { data } = await $api.post<FileDTO>(
      `/File/CreateEmptyFile?folderId=${folderId}&fileName=${fileName}`);
    return FolderRetrievalService.processFileDTO(data);
  }
}