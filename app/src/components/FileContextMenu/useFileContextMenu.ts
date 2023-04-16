import * as React from "react";
import { downloadFile, setDownloadItemPromise } from "@redux/slices/hierarchyDownloader";
import { closeFileContextMenu, deleteFile, findFileById, openFile } from "@redux/slices/hierarchy";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { DropDownListElement } from "@components/DropDownList";
import { setCuttedFile } from "@redux/slices/hieararchyCut";
import { isAllowedToViewFileType } from "@modals/FileViewModal/useFileViewModal";
import { NotificationService } from "@notification/NotificationService";
import useConfirmDialog from "@hooks/useConfirmDialog";

const useFileContextMenu = () => {
  const dispatch = useAppDispatch();

  const rootFolder = useAppSelector(state => state.hierarchy.rootFolder);
  const contextMenuSelectedFileId = useAppSelector(state => state.hierarchy.contextMenuSelectedFileId);
  const confirmDelete = useConfirmDialog("Вы уверены, что хотите удалить файл безвозвратно?");

  const selectedFile = React.useMemo(() => {
    return findFileById(rootFolder, contextMenuSelectedFileId);
  }, [rootFolder, contextMenuSelectedFileId]);

  const handleOpenFile = () => {
    if (selectedFile !== null) {
      if (isAllowedToViewFileType(selectedFile.type)) {
        dispatch(openFile(selectedFile));
      } else NotificationService.add("Файл нельзя открыть", "bottom-right", "info", 1500);
    }
    dispatch(closeFileContextMenu());
  }

  const handleDownloadFile = () => {
    if (selectedFile !== null) {
      const promise = dispatch(downloadFile(selectedFile.id));
      dispatch(setDownloadItemPromise({ id: selectedFile.id, promise }));
    }
    dispatch(closeFileContextMenu());
  }

  const handleCutFile = () => {
    if (selectedFile !== null)
      dispatch(setCuttedFile(selectedFile.id));
    dispatch(closeFileContextMenu());
  }

  const handleDeleteFile = async () => {
    const fileId = selectedFile?.id;
    dispatch(closeFileContextMenu());
    if (fileId) {
      if (await confirmDelete()) {
        dispatch(deleteFile(fileId));
      }
    }
  }

  const menuItems: DropDownListElement[] = [
    {
      onClick: handleOpenFile,
      label: "Открыть",
      disabled: !isAllowedToViewFileType(selectedFile.type),
      disabledLabel: "Не поддерживается."
    },
    {
      onClick: handleDownloadFile,
      label: "Скачать"
    },
    {
      onClick: handleCutFile,
      label: "Вырезать"
    },
    {
      label: "Переименовать"
    },
    {
      onClick: handleDeleteFile,
      label: "Удалить"
    }
  ];

  return {
    menuItems
  }
}
export default useFileContextMenu;
