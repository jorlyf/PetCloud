import * as React from "react";
import ChildFolderList from "@components/ChildFolderList";
import FolderModel from "@entities/file/FolderModel";

import styles from "./index.module.scss";

export interface IFolderProps {
  folder: FolderModel;
}

const Folder: React.FC<IFolderProps> = ({ folder }) => {
  return (
    <div className={styles.Folder}>
      <ChildFolderList folder={folder} />
    </div>
  )
}
export default Folder;
