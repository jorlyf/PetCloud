import * as React from "react";
import { closeFile } from "@redux/slices/hierarchy";
import { clearContent, loadFileContent } from "@redux/slices/openedFile";
import useAppDispatch from "@hooks/useAppDispatch";
import useOpenedFile from "@hooks/useOpenedFile";
import { FileType } from "@entities/file/FileModel";
import useAppSelector from "@hooks/useAppSelector";
import { NotificationService } from "@notification/NotificationService";

export const isAllowedToViewFileType = (fileType: FileType) => {
  if (fileType === FileType.video) return false; // TODO video player
  return fileType !== FileType.undefined;
}

const useFileViewModal = () => {
  const dispatch = useAppDispatch();
  const openedFile = useOpenedFile();
  const fileLoaded = useAppSelector(state => state.openedFile.loaded);

  const fileType = openedFile ? openedFile.type : null;

  const handleCloseFile = () => {
    if (fileType === FileType.text) {
      const result = confirm("Вы уверены, что желаете закрыть файл без сохранения?");
      if (result) dispatch(closeFile());
    } else dispatch(closeFile());
  }

  const retrieveFileContent = () => {
    dispatch(clearContent());
    dispatch(loadFileContent(openedFile.id));
  }

  React.useEffect(() => {
    if (!openedFile) return;
    retrieveFileContent();
  }, [openedFile]);

  return {
    fileType,
    handleCloseFile,
    fileLoaded,
    fileName: openedFile?.name
  }
}
export default useFileViewModal;
