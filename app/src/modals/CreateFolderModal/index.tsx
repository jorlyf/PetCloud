import * as React from "react";
import useCreateFolderModal from "./useCreateFolderModal";
import InputField from "@components/InputField";

import styles from "./index.module.scss";

const CreateFolderModal: React.FC = () => {
  const {
    folderName,
    handleSetFolderName,
    handleCreateFolder,
    handleCloseModal,
  } = useCreateFolderModal();

  return (
    <div className={styles.CreateFolderModal}>
      <h1>Новая папка</h1>
      <div className={styles.FolderNameInput}>
        <InputField
          value={folderName}
          setValue={handleSetFolderName}
          isOneRow={true}
          placeholder={"Название папки"}
        />
      </div>
      <div className={styles.Buttons}>
        <button onClick={handleCloseModal}>Отмена</button>
        <button disabled={folderName.length === 0} onClick={handleCreateFolder}>Готово</button>
      </div>
    </div>
  )
}
export default CreateFolderModal;
