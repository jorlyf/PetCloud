import * as React from "react";
import useFileViewModal from "./useFileViewModal";
import TxtEditor from "./TxtEditor";
import useOutsideClick from "@hooks/useOutsideClick";
import { FileType } from "@entities/file/FileModel";

import styles from "./index.module.scss";

const FileViewModal: React.FC = () => {
  const {
    fileType,
    handleCloseFile
  } = useFileViewModal();

  const divRef = React.useRef(null);

  useOutsideClick(handleCloseFile, divRef);

  const getChildComponent = () => {
    switch (fileType) {
      case FileType.text: return <TxtEditor />;
      default: return <></>;
    }
  }

  return (
    <>
      <div ref={divRef} className={styles.FileViewModal}>
        {getChildComponent()}
      </div>
      <div className={styles.Overlay} />
    </>
  )
}
export default FileViewModal;
