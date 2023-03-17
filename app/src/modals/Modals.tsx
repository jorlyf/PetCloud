import * as React from "react";
import useModals from "./useModals";
import CreateFolderModal from "./CreateFolderModal";
import CreateFileModal from "./CreateFileModal";
import FileViewModal from "./FileViewModal";

const Modals: React.FC = () => {
  const {
    isOpenCreateFileModal,
    isOpenCreateFolderModal,
    isOpenFileViewModal
  } = useModals();

  return (
    <>
      {isOpenCreateFileModal && <CreateFileModal />}
      {isOpenCreateFolderModal && <CreateFolderModal />}
      {isOpenFileViewModal && <FileViewModal />}
    </>
  )
}
export default Modals;
