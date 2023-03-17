import * as React from "react";
import useFileContextMenu from "./useFileContextMenu";
import useOutsideClick from "@hooks/useOutsideClick";
import Vector2 from "@entities/common/Vector2";

import styles from "./index.module.scss";

interface IFileContextMenuProps {
  position: Vector2;
  handleClose: () => void;
}

const FileContextMenu: React.FC<IFileContextMenuProps> = ({ position, handleClose }) => {
  const {
    handleOpenFile
  } = useFileContextMenu();

  const divRef = React.useRef(null);

  useOutsideClick(handleClose, divRef);

  return (
    <div ref={divRef} className={styles.FileContextMenu} style={{ left: position.x, top: position.y }}>
      <div onClick={() => handleOpenFile()} className={styles.Item}>
        <span>Открыть</span>
      </div>
      <div className={styles.Item}>
        <span>Переименовать</span>
      </div>
      <div className={styles.Item}>
        <span>Удалить</span>
      </div>
    </div>
  )
}
export default FileContextMenu;
