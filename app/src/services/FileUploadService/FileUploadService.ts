import $api from "@http/api";
import { AxiosRequestConfig } from "axios";

export default class FileUploadService {
  static async uploadFiles(folderId: string, files: File[], onUploadProgress: (progress: number) => void) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    const options: AxiosRequestConfig = {
      onUploadProgress: (e) => {
        onUploadProgress(e.loaded / e.total);
      }
    }

    await $api.post(`/File/UploadFiles?folderId=${folderId}`, formData, options);
  }
}