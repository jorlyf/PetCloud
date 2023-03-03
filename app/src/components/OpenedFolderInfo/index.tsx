import * as React from "react";
import useOpenedFolderInfo from "./useOpenedFolderInfo";

import styles from "./index.module.scss";

const OpenedFolderInfo: React.FC = () => {
  const {
    openedFolder
  } = useOpenedFolderInfo();
  
  if (!openedFolder) return (<></>)

  return (
    <div className={styles.FolderInfo}>
      <span className={styles.Name}>{openedFolder.name}</span>
      <span className={styles.Path}>{openedFolder.path}</span>
    </div>
  )
}
export default OpenedFolderInfo;
