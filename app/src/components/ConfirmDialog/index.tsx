import * as React from "react";

import styles from "./index.module.scss";

interface ConfirmDialogProps {
  message: string;
  handleCancel: () => void;
  handleConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, handleCancel, handleConfirm }) => {
  return (
    <div className={styles.ConfirmDialog}>
      <span>{message}</span>
      <div className={styles.Buttons}>
        <button onClick={handleCancel}>Отмена</button>
        <button onClick={handleConfirm}>Принять</button>
      </div>
    </div>
  )
}
export default ConfirmDialog;
