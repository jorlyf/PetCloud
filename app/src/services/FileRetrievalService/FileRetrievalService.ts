import $api from "@http/api";

export default class FileRetrievalService {
  static async retrieveFileContent(fileId: string, callbackOnLoad: (buffer: ArrayBuffer) => void) {
    const response = await $api.get<Blob>(`/Retrieval/GetFileContent?fileId=${fileId}`, {
      responseType: "blob"
    });
    const reader = new FileReader();
    reader.onload = () => {
      callbackOnLoad(reader.result as ArrayBuffer);
    }
    reader.readAsArrayBuffer(response.data);
  }
}