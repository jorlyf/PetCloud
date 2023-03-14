import { clear, setFolderName, submitFolderCreation } from "@redux/slices/createFolder";
import useAppDispatch from "@hooks/useAppDispatch";
import useOpenedFolder from "@hooks/useOpenedFolder";
import useAppSelector from "@hooks/useAppSelector";

const useCreateFolderModal = () => {
  const dispatch = useAppDispatch();

  const openedFolder = useOpenedFolder();
  const folderName = useAppSelector(state => state.createFolder.folderName);

  const handleSetFolderName = (newValue: string) => {
    dispatch(setFolderName(newValue));
  }

  const handleCreateFolder = () => {
    dispatch(submitFolderCreation({ parentFolderId: openedFolder.id, folderName }));
    dispatch(clear());
  }
  const handleCloseModal = () => {
    dispatch(clear());
  }

  return {
    folderName,
    handleSetFolderName,
    handleCreateFolder,
    handleCloseModal
  }
}
export default useCreateFolderModal;
