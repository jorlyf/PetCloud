import * as React from "react";
import useFileList from "./useFileList";
import FileContextMenu from "@components/FileContextMenu";
import FileAreaContextMenu from "@components/FileAreaContextMenu";
import FolderModel from "@entities/file/FolderModel";

import styles from "./index.module.scss";

interface IFileListProps {
  folder: FolderModel;
}

const FileList: React.FC<IFileListProps> = ({ folder }) => {
  const fileListDivRef = React.useRef<HTMLDivElement>(null);

  const {
    isOpenFileContextMenu,
    fileContextMenuPosition,
    isOpenFileAreaContextMenu,
    fileAreaContextMenuPosition,
    handleOpenFileContextMenu,
    handleCloseFileContextMenu,
    handleOpenFileAreaContextMenu,
    handleCloseFileAreaContextMenu
  } = useFileList(fileListDivRef);

  return (
    <div ref={fileListDivRef} className={styles.FileList} onContextMenu={handleOpenFileAreaContextMenu}>
      {folder.childFiles.map(f => {
        return (
          <div key={f.path} className={styles.Item} onContextMenu={(e) => handleOpenFileContextMenu(e, f.path)}>
            <span className={styles.Name}>{f.name}</span>
          </div>
        )
      })}
      {isOpenFileContextMenu && <FileContextMenu handleClose={handleCloseFileContextMenu} position={fileContextMenuPosition} />}
      {isOpenFileAreaContextMenu && <FileAreaContextMenu handleClose={handleCloseFileAreaContextMenu} position={fileAreaContextMenuPosition} />}
    </div>
  )
}
export default FileList;
