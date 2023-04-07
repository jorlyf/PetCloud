import { setIsOpenModal as setIsOpenCreateFolderModal } from "@redux/slices/createFolder";
import { setIsOpenModal as setIsOpenCreateFileModal } from "@redux/slices/createFile";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { downloadFolder, setDownloadItemPromise } from "@redux/slices/hierarchyDownloader";
import { uploadFiles } from "@redux/slices/fileUpload";
import { closeFileAreaContexteMenu } from "@redux/slices/hierarchy";
import { DropDownListElement } from "@components/DropDownList";
import { NotificationService } from "@notification/NotificationService";
import { moveFile } from "@redux/slices/hieararchyCut";

interface IUseFileAreaContextMenuProps {
  handleClose: () => void;
}

const useFileAreaContextMenu = ({ handleClose }: IUseFileAreaContextMenuProps) => {
  const dispatch = useAppDispatch();

  const openedFolderId = useAppSelector(state => state.hierarchy.openedFolderId);
  const fileLoading = useAppSelector(state => state.fileUpload.loading);

  const hieararchyCut = useAppSelector(state => state.hierarchyCut);

  const handleUploadFiles = () => {
    if (!openedFolderId) return;
    if (fileLoading) {
      NotificationService.add("Подождите, пока загрузятся файлы.", "bottom-right", "warning");
      return;
    }

    const htmlInput = document.createElement("input");
    htmlInput.type = "file";
    htmlInput.multiple = true;

    htmlInput.click();
    htmlInput.onchange = () => {
      const files: File[] = [];
      for (let i = 0; i < htmlInput.files.length; i++) {
        files.push(htmlInput.files.item(i));
      }

      dispatch(uploadFiles({ folderId: openedFolderId, files }));
    }
    handleClose();
  }

  const handleCreateFile = () => {
    dispatch(setIsOpenCreateFileModal(true));
    handleClose();
  }
  const handleCreateFolder = () => {
    dispatch(setIsOpenCreateFolderModal(true));
    handleClose();
  }

  const handlePasteCutted = () => {
    const targetFolderId = openedFolderId;
    if (hieararchyCut.cuttedFileId) {
      dispatch(moveFile({ fileId: hieararchyCut.cuttedFileId, targetFolderId }));
    }
    else if (hieararchyCut.cuttedFolderId) {
      dispatch(moveFile({ fileId: hieararchyCut.cuttedFolderId, targetFolderId }));
    }
    handleClose();
  }

  const handleDownloadFolder = () => {
    if (openedFolderId === null) return;
    const promise = dispatch(downloadFolder(openedFolderId));
    dispatch(setDownloadItemPromise({ id: openedFolderId, promise }));
    dispatch(closeFileAreaContexteMenu());
  }

  const items: DropDownListElement[] = [
    {
      onClick: handleUploadFiles,
      label: "Загрузить файлы"
    },
    {
      onClick: handlePasteCutted,
      label: "Вставить",
      disabled: hieararchyCut.cuttedFileId === null && hieararchyCut.cuttedFolderId === null
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

  return {
    items
  }
}
export default useFileAreaContextMenu;
