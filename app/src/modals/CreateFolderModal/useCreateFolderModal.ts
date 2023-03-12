import { clear, setFolderName } from "@redux/slices/createFolder";
import { addChildFolder } from "@redux/slices/file";
import useAppDispatch from "@hooks/useAppDispatch";
import FolderModel from "@entities/file/FolderModel";
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
    // const folder: FolderModel = {
    //   id: "",
    //   name: folderName,
    //   isRoot: false,
    //   childFolders: [],
    //   files: []
    // }
    // dispatch(addChildFolder(folder));
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
