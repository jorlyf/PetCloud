import * as React from "react";
import useFileAreaContextMenu from "./useFileAreaContextMenu";
import useOutsideClick from "@hooks/useOutsideClick";
import DropDownList from "@components/DropDownList";
import Vector2 from "@entities/common/Vector2";

import styles from "./index.module.scss";

interface IFileAreaContextMenuProps {
  position: Vector2,
  handleClose: () => void;
}

const FileAreaContextMenu: React.FC<IFileAreaContextMenuProps> = ({ position, handleClose }) => {
  const divRef = React.useRef(null);

  const {
    items,
  } = useFileAreaContextMenu({ handleClose: handleClose });
  useOutsideClick(handleClose, divRef);

  return (
    <div ref={divRef} className={styles.FileAreaContextMenu} style={{ left: position.x, top: position.y }}>
      <DropDownList items={items} />
    </div>
  )
}
export default FileAreaContextMenu;
