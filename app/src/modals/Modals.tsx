import * as React from "react";
import useModals from "./useModals";
import CreateFolderModal from "./CreateFolderModal";

const Modals: React.FC = () => {
  const {
    isOpenCreateFolderModal
  } = useModals();

  return (
    <>
      {isOpenCreateFolderModal && <CreateFolderModal />}
    </>
  )
}
export default Modals;
