import * as React from "react";
import { deleteFolder, openFolder } from "@redux/slices/hierarchy";
import useAppDispatch from "@hooks/useAppDispatch";
import DropDownList, { DropDownListElement } from "@components/DropDownList";
import FolderModel from "@entities/file/FolderModel";

import styles from "./index.module.scss";
import useConfirmDialog from "@hooks/useConfirmDialog";
import useOutsideClick from "@hooks/useOutsideClick";

interface IChildFolderListProps {
  folder: FolderModel;
}

const ChildFolderList: React.FC<IChildFolderListProps> = ({ folder }) => {
  const dispatch = useAppDispatch();

  const folderContextMenuDivRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(() => {
    setContextedFolderId(null);
  }, folderContextMenuDivRef);

  const [contextedFolderId, setContextedFolderId] = React.useState<string>(null);
  const confirmFolderDelete = useConfirmDialog("Вы уверены, что хотите безвовратно удалить папку?");

  const contextMenuItems: DropDownListElement[] = [
    {
      label: "Вырезать"
    },
    {
      onClick: () => handleDeleteFolder(contextedFolderId),
      label: "Удалить"
    }
  ]

  const handleDeleteFolder = async (folderId: string) => {
    if (await confirmFolderDelete())
      dispatch(deleteFolder(folderId))
  }

  const onFolderContextMenuClick = (e: React.MouseEvent<HTMLDivElement>, folderId: string) => {
    e.preventDefault();
    setContextedFolderId(folderId);
  }

  const onContextMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  return (
    <div onContextMenu={onContextMenuClick} className={styles.ChildFolderList}>
      {folder.childFolders.map(f => {
        return (
          <div key={f.id} className={styles.Container}>
            <div onClick={() => dispatch(openFolder(f))}
              onContextMenu={e => onFolderContextMenuClick(e, f.id)} className={styles.ChildFolder}
            >
              <img src="/images/Folder.png" />
              <span>{f.name}</span>
            </div>

            {contextedFolderId === f.id && // folder context menu
              <div ref={folderContextMenuDivRef} className={styles.FolderContextMenu}>
                <DropDownList
                  items={contextMenuItems}
                />
              </div>
            }
          </div>
        )
      })}
    </div>
  )
}
export default ChildFolderList;
