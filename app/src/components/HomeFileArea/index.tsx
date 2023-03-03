import * as React from "react";
import useHomeFileArea from "./useHomeFileArea";
import FileAreaContextMenu from "@components/FileAreaContextMenu";
import FileList from "@components/FileList";

import styles from "./index.module.scss";

const HomeFileArea: React.FC = () => {
  const {
    openedFolder,
    isOpenContextMenu,
    contextMenuPosition,
    handleOpenContextMenu,
    handleBackgroundClick
  } = useHomeFileArea();

  if (!openedFolder) {
    return (
      <></>
    )
  }

  return (
    <>
      <div className={styles.HomeFileArea} onClick={handleBackgroundClick} onContextMenu={handleOpenContextMenu}>
        <FileList folder={openedFolder} />
      </div>

      {isOpenContextMenu && <FileAreaContextMenu position={contextMenuPosition} />}
    </>
  )
}
export default HomeFileArea;
