import * as React from "react";
import useOutsideClick from "@hooks/useOutsideClick";
import Vector2 from "@entities/common/Vector2";

import styles from "./index.module.scss";

interface IFileAreaContextMenuProps {
  position: Vector2,
  handleClose: () => void;
}

const FileAreaContextMenu: React.FC<IFileAreaContextMenuProps> = ({ position, handleClose }) => {
  
  const divRef = React.useRef(null);

  useOutsideClick(handleClose, divRef);

  return (
    <div ref={divRef} className={styles.FileAreaContextMenu} style={{ left: position.x, top: position.y }}>
      <div className={styles.Item}>
        <img src="/images/File.png" />
        <span>Создать файл</span>
      </div>
      <div className={styles.Item}>
        <img src="/images/Folder.png" />
        <span>Создать папку</span>
      </div>
    </div>
  )
}
export default FileAreaContextMenu;
