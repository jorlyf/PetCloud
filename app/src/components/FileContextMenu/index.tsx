import * as React from "react";
import useFileContextMenu from "./useFileContextMenu";
import useOutsideClick from "@hooks/useOutsideClick";
import DropDownList, { DropDownListElement } from "@components/DropDownList";
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

  const items: DropDownListElement[] = [
    {
      onClick: handleOpenFile,
      label: "Открыть"
    },
    {
      label: "Переименовать"
    },
    {
      label: "Удалить"
    }
  ];

  return (
    <div ref={divRef} className={styles.FileContextMenu} style={{ left: position.x, top: position.y }}>
      <DropDownList
        items={items}
      />
    </div>
  )
}
export default FileContextMenu;
