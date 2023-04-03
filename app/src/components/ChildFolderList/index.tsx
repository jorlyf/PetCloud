import * as React from "react";
import { openFolder } from "@redux/slices/file";
import useAppDispatch from "@hooks/useAppDispatch";
import FolderModel from "@entities/file/FolderModel";

import styles from "./index.module.scss";

interface IChildFolderListProps {
  folder: FolderModel;
}

const ChildFolderList: React.FC<IChildFolderListProps> = ({ folder }) => {
  const dispatch = useAppDispatch();
  
  return (
    <div className={styles.ChildFolderList}>
      {folder.childFolders.map(f => {
        return (
          <div key={f.id} onClick={() => dispatch(openFolder(f))} className={styles.Child}>
            <img src="/images/Folder.png" />
            <span>{f.name}</span>
          </div>
        )
      })}
    </div>
  )
}
export default ChildFolderList;
