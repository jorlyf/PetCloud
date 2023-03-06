import * as React from "react";
import useCreateFileModal from "./useCreateFileModal";
import InputField from "@components/InputField";

import styles from "./index.module.scss";

const CreateFileModal: React.FC = () => {
  const {
    fileName,
    handleSetFileName,
    handleCloseModal,
    handleCreateFile
  } = useCreateFileModal();

  return (
    <div className={styles.CreateFileModal}>
      <h1>Новый файл</h1>
      <div className={styles.FileNameInput}>
        <InputField
          value={fileName}
          setValue={handleSetFileName}
          isOneRow={true}
          placeholder={"Название файла"}
        />
      </div>
      <div className={styles.Buttons}>
        <button onClick={handleCloseModal}>Отмена</button>
        <button disabled={fileName.length === 0} onClick={handleCreateFile}>Готово</button>
      </div>
    </div>
  )
}
export default CreateFileModal;
