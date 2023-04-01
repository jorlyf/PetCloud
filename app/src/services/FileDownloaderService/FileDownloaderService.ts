import $api from "@http/api";
import { AxiosRequestConfig, GenericAbortSignal } from "axios";

export default class FileDownloaderService {
  static async saveFile(fileId: string, fileName: string, onProgress: (progress: number) => void, signal: GenericAbortSignal) {
    const config: AxiosRequestConfig = {
      responseType: "blob",
      onDownloadProgress: (e) => {
        onProgress(e.progress);
      },
      signal
    }
    const resp = await $api.get<Blob>(`/Download/DownloadFile?fileId=${fileId}`, config);

    const linkElem = document.createElement("a");
    const blob = new Blob([resp.data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(new Blob([blob]));
    linkElem.href = url;
    linkElem.setAttribute("download", fileName);
    linkElem.click();
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
  }
  static async saveFolder(folderId: string) {

  }
}