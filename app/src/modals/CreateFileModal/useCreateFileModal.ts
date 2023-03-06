import { setFileName, clear } from "@redux/slices/createFile";
import { addChildFile } from "@redux/slices/file";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useOpenedFolder from "@hooks/useOpenedFolder";
import FileModel from "@entities/file/FileModel";

const useCreateFileModal = () => {
  const dispatch = useAppDispatch();

  const openedFolder = useOpenedFolder();
  const fileName = useAppSelector(state => state.createFile.fileName);

  const handleSetFileName = (newValue: string) => {
    dispatch(setFileName(newValue));
  }
  const handleCloseModal = () => {
    dispatch(clear());
  }
  const handleCreateFile = () => {
    const file: FileModel = {
      name: fileName,
      path: openedFolder.path + "/" + fileName,
      parentPath: openedFolder.path
    }

    dispatch(addChildFile(file));
    dispatch(clear());
  }

  return {
    fileName,
    handleSetFileName,
    handleCloseModal,
    handleCreateFile
  }
}
export default useCreateFileModal;
