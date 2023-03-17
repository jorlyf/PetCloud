import useAppSelector from "@hooks/useAppSelector";
import useOpenedFile from "@hooks/useOpenedFile";

const useModals = () => {
  const isOpenCreateFileModal = useAppSelector(state => state.createFile.isOpenModal);
  const isOpenCreateFolderModal = useAppSelector(state => state.createFolder.isOpenModal);
  const openedFile = useOpenedFile();

  return {
    isOpenCreateFileModal,
    isOpenCreateFolderModal,
    isOpenFileViewModal: openedFile ? true : false
  }
}
export default useModals;
