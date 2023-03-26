import { setIsOpenModal as setIsOpenCreateFolderModal } from "@redux/slices/createFolder";
import { setIsOpenModal as setIsOpenCreateFileModal } from "@redux/slices/createFile";
import useAppDispatch from "@hooks/useAppDispatch";
import FileUploadService from "@services/FileUploadService/FileUploadService";
import useAppSelector from "@hooks/useAppSelector";
import { uploadFiles } from "@redux/slices/file";

interface IUseFileAreaContextMenuProps {
  handleClose: () => void;
}

const useFileAreaContextMenu = ({ handleClose }: IUseFileAreaContextMenuProps) => {
  const dispatch = useAppDispatch();

  const openedFolderId = useAppSelector(state => state.file.openedFolderId);

  const handleUploadFiles = () => {
    if (!openedFolderId) return;

    const htmlInput = document.createElement("input");
    htmlInput.type = "file";
    htmlInput.multiple = true;

    htmlInput.click();
    htmlInput.onchange = () => {
      const files: File[] = [];
      for (let i = 0; i < htmlInput.files.length; i++) {
        files.push(htmlInput.files.item(i));
      }
      
      dispatch(uploadFiles({folderId: openedFolderId, files}));
    }
    handleClose();
  }

  const handleCreateFile = () => {
    dispatch(setIsOpenCreateFileModal(true));
    handleClose();
  }
  const handleCreateFolder = () => {
    dispatch(setIsOpenCreateFolderModal(true));
    handleClose();
  }

  return {
    handleUploadFiles,
    handleCreateFile,
    handleCreateFolder
  }
}
export default useFileAreaContextMenu;
