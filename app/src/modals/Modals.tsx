import * as React from "react";
import useModals from "./useModals";
import CreateFolderModal from "./CreateFolderModal";
import CreateFileModal from "./CreateFileModal";

const Modals: React.FC = () => {
  const {
    isOpenCreateFileModal,
    isOpenCreateFolderModal
  } = useModals();

  return (
    <>
      {isOpenCreateFileModal && <CreateFileModal />}
      {isOpenCreateFolderModal && <CreateFolderModal />}
    </>
  )
}
export default Modals;
