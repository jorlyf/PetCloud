import useAppSelector from "@hooks/useAppSelector";

const useConfirmDialogsModal = () => {
  const dialogs = useAppSelector(state => state.confirmDialogs.dialogs);

  return dialogs;
}
export default useConfirmDialogsModal;
