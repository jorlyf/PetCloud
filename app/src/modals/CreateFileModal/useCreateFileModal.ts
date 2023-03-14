import { setFileName, clear, submitFileCreation } from "@redux/slices/createFile";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import useOpenedFolder from "@hooks/useOpenedFolder";

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
    dispatch(submitFileCreation({ folderId: openedFolder.id, fileName }));
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
