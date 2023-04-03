import * as React from "react";
import useFileAreaContextMenu from "./useFileAreaContextMenu";
import useOutsideClick from "@hooks/useOutsideClick";
import DropDownList, { DropDownListElement } from "@components/DropDownList";
import Vector2 from "@entities/common/Vector2";

import styles from "./index.module.scss";

interface IFileAreaContextMenuProps {
  position: Vector2,
  handleClose: () => void;
}

const FileAreaContextMenu: React.FC<IFileAreaContextMenuProps> = ({ position, handleClose }) => {
  const divRef = React.useRef(null);

  const {
    handleUploadFiles,
    handleCreateFile,
    handleCreateFolder,
    handleDownloadFolder
  } = useFileAreaContextMenu({ handleClose: handleClose });
  useOutsideClick(handleClose, divRef);

  const items: DropDownListElement[] = [
    {
      onClick: handleUploadFiles,
      label: "Загрузить файлы"
    },
    {
      onClick: handleCreateFile,
      iconSrc: "/images/File.png",
      label: "Создать файл"
    },
    {
      onClick: handleCreateFolder,
      iconSrc: "/images/Folder.png",
      label: "Создать папку"
    },
    {
      onClick: handleDownloadFolder,
      label: "Скачать папку"
    }
  ];

  return (
    <div ref={divRef} className={styles.FileAreaContextMenu} style={{ left: position.x, top: position.y }}>
      <DropDownList
        items={items}
      />
    </div>
  )
}
export default FileAreaContextMenu;
