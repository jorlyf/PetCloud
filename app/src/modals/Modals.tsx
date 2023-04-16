import * as React from "react";
import useModals from "./useModals";
import CreateFolderModal from "./CreateFolderModal";
import CreateFileModal from "./CreateFileModal";
import FileViewModal from "./FileViewModal";
import DownloadInfoModal from "./DownloadInfoModal";
import ConfirmDialogsModal from "./ConfirmDialogsModal";

const Modals: React.FC = () => {
  const {
    isOpenCreateFileModal,
    isOpenCreateFolderModal,
    isOpenFileViewModal,
    isOpenDownloadInfoModal,
    isOpenConfirmDialogsModal
  } = useModals();

  return (
    <>
      {isOpenCreateFileModal && <CreateFileModal />}
      {isOpenCreateFolderModal && <CreateFolderModal />}
      {isOpenFileViewModal && <FileViewModal />}
      {isOpenDownloadInfoModal && <DownloadInfoModal />}
      {isOpenConfirmDialogsModal && <ConfirmDialogsModal />}
    </>
  )
}
export default Modals;
