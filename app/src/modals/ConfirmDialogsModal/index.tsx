import * as React from "react";
import useConfirmDialogsModal from "./useConfirmDialogsModal";
import ConfirmDialog from "@components/ConfirmDialog";

import styles from "./index.module.scss";

const ConfirmDialogsModal: React.FC = () => {
  const dialogs = useConfirmDialogsModal();

  return (
    <div className={styles.ConfirmDialogList}>
      {dialogs.map(dialog => (
        <ConfirmDialog
          key={dialog.id}
          handleConfirm={dialog.onConfirm}
          handleCancel={dialog.onCancel}
          message={dialog.message}
        />
      ))}
    </div>
  )
}
export default ConfirmDialogsModal;
