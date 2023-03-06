import { setIsOpenModal } from "@redux/slices/createFolder";
import useAppDispatch from "@hooks/useAppDispatch";
import useOpenedFolder from "@hooks/useOpenedFolder";

interface IUseFileAreaContextMenuProps {
  handleClose: () => void;
}

const useFileAreaContextMenu = ({ handleClose }: IUseFileAreaContextMenuProps) => {
  const dispatch = useAppDispatch();

  const openedFolder = useOpenedFolder();

  const handleCreateFile = () => {
    handleClose();
  }
  const handleCreateFolder = () => {
    dispatch(setIsOpenModal(true));

    handleClose();
  }

  return {
    handleCreateFile,
    handleCreateFolder
  }
}
export default useFileAreaContextMenu;
