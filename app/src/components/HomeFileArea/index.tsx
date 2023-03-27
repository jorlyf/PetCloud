import * as React from "react";
import useHomeFileArea from "./useHomeFileArea";
import FileList from "@components/FileList";

import styles from "./index.module.scss";
import HomeProgressBar from "@components/HomeProgressBar";

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
      <div className={styles.HomeFileArea}>
        <FileList folder={openedFolder} />
        <HomeProgressBar />
      </div>
  )
}
export default HomeFileArea;
