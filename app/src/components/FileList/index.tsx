import * as React from "react";
import FolderModel from "@entities/file/FolderModel";

import styles from "./index.module.scss";

interface IFileListProps {
  folder: FolderModel;
}

const FileList: React.FC<IFileListProps> = ({ folder }) => {
  return (
    <div className={styles.FileList}>
      {folder.childFiles.map(f => {
        return (
          <div key={f.path} className={styles.Item}>
            <span className={styles.Name}>{f.name}</span>
          </div>
        )
      })}
    </div>
  )
}
export default FileList;
