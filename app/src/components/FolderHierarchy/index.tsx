import * as React from "react";
import useFolderHierarchy from "./useFolderHierarchy";
import Folder from "@components/Folder";
import OpenedFolderInfo from "@components/OpenedFolderInfo";

import styles from "./index.module.scss";
import useAppDispatch from "@hooks/useAppDispatch";
import { backToParentFolder } from "@redux/slices/file";

const FolderHierarchy: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    openedFolder
  } = useFolderHierarchy();

  return (
    <div className={styles.FolderHierarchy}>
      <header>
        <img src="/images/ArrowBack.png" onClick={() => dispatch(backToParentFolder())} className={styles.BackButton} />
        <OpenedFolderInfo />
      </header>
      {openedFolder && <Folder folder={openedFolder} />}
    </div>
  )
}
export default FolderHierarchy;
