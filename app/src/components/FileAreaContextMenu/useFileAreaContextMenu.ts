import { setIsOpenModal as setIsOpenCreateFolderModal } from "@redux/slices/createFolder";
import { setIsOpenModal as setIsOpenCreateFileModal } from "@redux/slices/createFile";
import useAppDispatch from "@hooks/useAppDispatch";

interface IUseFileAreaContextMenuProps {
  handleClose: () => void;
}

const useFileAreaContextMenu = ({ handleClose }: IUseFileAreaContextMenuProps) => {
  const dispatch = useAppDispatch();

  const handleCreateFile = () => {
    dispatch(setIsOpenCreateFileModal(true));
    handleClose();
  }
  const handleCreateFolder = () => {
    dispatch(setIsOpenCreateFolderModal(true));
    handleClose();
  }

  return {
    handleCreateFile,
    handleCreateFolder
  }
}
export default useFileAreaContextMenu;
