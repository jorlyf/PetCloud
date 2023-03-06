import useAppSelector from "@hooks/useAppSelector";

const useModals = () => {
  const isOpenCreateFileModal = useAppSelector(state => state.createFile.isOpenModal);
  const isOpenCreateFolderModal = useAppSelector(state => state.createFolder.isOpenModal);

  return {
    isOpenCreateFileModal,
    isOpenCreateFolderModal
  }
}
export default useModals;
