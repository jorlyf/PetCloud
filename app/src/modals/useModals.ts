import useAppSelector from "@hooks/useAppSelector";
import useOpenedFile from "@hooks/useOpenedFile";

const useModals = () => {
  const isOpenCreateFileModal = useAppSelector(state => state.createFile.isOpenModal);
  const isOpenCreateFolderModal = useAppSelector(state => state.createFolder.isOpenModal);
  const openedFile = useOpenedFile();
  const downloadItemsCount = useAppSelector(state => state.hierarchyDownloader.items.length);
  const confirmDialogsLength = useAppSelector(state => state.confirmDialogs.dialogs.length);

  return {
    isOpenCreateFileModal,
    isOpenCreateFolderModal,
    isOpenFileViewModal: openedFile ? true : false,
    isOpenDownloadInfoModal: downloadItemsCount > 0,
    isOpenConfirmDialogsModal: confirmDialogsLength > 0
  }
}
export default useModals;
