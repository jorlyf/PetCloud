import useAppDispatch from "./useAppDispatch";
import { addConfirmDialog, deleteConfirmDialog } from "@redux/slices/confirmDialogs";
import { generateUUID } from "@helpers/uuid";

const useConfirmDialog = (message: string) => {
  const dispatch = useAppDispatch();

  const confirm = () => new Promise<boolean>((resolve, reject) => {
    createDialog(resolve);
  });

  const createDialog = (resolve: (value: boolean | PromiseLike<boolean>) => void) => {
    const id = generateUUID();

    dispatch(addConfirmDialog({
      id,
      message,
      onConfirm: () => {
        resolve(true);
        deleteDialog(id);
      },
      onCancel: () => {
        resolve(false);
        deleteDialog(id);
      }
    }));
  }

  const deleteDialog = (id: string) => {
    dispatch(deleteConfirmDialog(id));
  }
  return confirm;
}
export default useConfirmDialog;
