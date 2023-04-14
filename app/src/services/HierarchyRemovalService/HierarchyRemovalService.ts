import $api from "@http/api";

export default class HierarchyRemovalService {
  static async deleteFile(fileId: string) {
    await $api.delete(`/File/DeleteFile?fileId=${fileId}`);
  }

  static async deleteFolder(folderId: string) {
    await $api.delete(`/File/DeleteFolder?folderId=${folderId}`);
  }
}