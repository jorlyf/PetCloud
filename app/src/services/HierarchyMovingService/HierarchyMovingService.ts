import $api from "@http/api";

export default class HierarchyMovingService {
  static async moveFile(fileId: string, targetFolderId: string) {
    await $api.post(`/File/MoveFile?fileId=${fileId}&targetFolderId=${targetFolderId}`);
  }
  static async moveFolder(folderId: string, targetFolderId: string) {
    await $api.post(`/File/MoveFolder?folderId=${folderId}&targetFolderId=${targetFolderId}`);
  }
}