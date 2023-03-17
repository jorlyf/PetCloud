import { closeFile } from "@redux/slices/file";
import useAppDispatch from "@hooks/useAppDispatch";
import useOpenedFile from "@hooks/useOpenedFile";
import { FileType } from "@entities/file/FileModel";

const useFileViewModal = () => {
  const dispatch = useAppDispatch();
  const openedFile = useOpenedFile();

  const fileType = openedFile ? openedFile.type : null;

  const handleCloseFile = () => {
    if (fileType === FileType.text) {
      const result = confirm("Вы уверены, что желаете закрыть файл без сохранения?");
      if (result) dispatch(closeFile());
    } else dispatch(closeFile());
  }

  return {
    fileType,
    handleCloseFile
  }
}
export default useFileViewModal;
