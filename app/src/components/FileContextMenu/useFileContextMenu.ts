import * as React from "react";
import { downloadFile, setDownloadItemPromise } from "@redux/slices/hierarchyDownloader";
import { closeFileContextMenu, findFileById, openFile } from "@redux/slices/hierarchy";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { DropDownListElement } from "@components/DropDownList";

const useFileContextMenu = () => {
  const dispatch = useAppDispatch();

  const rootFolder = useAppSelector(state => state.hierarchy.rootFolder);
  const contextMenuSelectedFileId = useAppSelector(state => state.hierarchy.contextMenuSelectedFileId);

  const selectedFile = React.useMemo(() => {
    return findFileById(rootFolder, contextMenuSelectedFileId);
  }, [rootFolder, contextMenuSelectedFileId]);

  const handleOpenFile = () => {
    if (selectedFile !== null)
      dispatch(openFile(selectedFile));
    dispatch(closeFileContextMenu());
  }

  const handleDownloadFile = () => {
    if (selectedFile !== null) {
      const promise = dispatch(downloadFile(selectedFile.id));
      dispatch(setDownloadItemPromise({ id: selectedFile.id, promise }));
    }
    dispatch(closeFileContextMenu());
  }

  const menuItems: DropDownListElement[] = [
    {
      onClick: handleOpenFile,
      label: "Открыть"
    },
    {
      onClick: handleDownloadFile,
      label: "Скачать"
    },
    {
      label: "Переименовать"
    },
    {
      label: "Удалить"
    }
  ];

  return {
    menuItems
  }
}
export default useFileContextMenu;
