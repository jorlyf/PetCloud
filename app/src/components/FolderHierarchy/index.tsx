import * as React from "react";
import useFolderHierarchy from "./useFolderHierarchy";
import { backToParentFolder } from "@redux/slices/hierarchy";
import useAppDispatch from "@hooks/useAppDispatch";
import Folder from "@components/Folder";
import OpenedFolderInfo from "@components/OpenedFolderInfo";

import styles from "./index.module.scss";

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
