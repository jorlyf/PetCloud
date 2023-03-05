import * as React from "react";
import useHomeFileArea from "./useHomeFileArea";
import FileAreaContextMenu from "@components/FileAreaContextMenu";
import FileList from "@components/FileList";

import styles from "./index.module.scss";

const HomeFileArea: React.FC = () => {
  const {
    openedFolder
  } = useHomeFileArea();

  if (!openedFolder) {
    return (
      <div></div>
    )
  }

  return (
    <>
      <div className={styles.HomeFileArea}>
        <FileList folder={openedFolder} />
      </div>
    </>
  )
}
export default HomeFileArea;
