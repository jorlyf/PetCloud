import useAppSelector from "@hooks/useAppSelector";

const useModals = () => {
  const isOpenCreateFolderModal = useAppSelector(state => state.createFolder.isOpenModal);

  return {
    isOpenCreateFolderModal
  }
}
export default useModals;
