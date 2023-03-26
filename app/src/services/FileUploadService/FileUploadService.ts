import $api from "@http/api";

export default class FileUploadService {
  static async uploadFiles(folderId: string, files: File[]) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    await $api.post(`/File/UploadFiles?folderId=${folderId}`, formData);
  }
}