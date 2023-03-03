import * as React from "react";
import useAppSelector from "@hooks/useAppSelector";

const useOpenedFolderInfo = () => {
  const openedFolder = useAppSelector(state => state.file.openedFolder);

  return {
    openedFolder
  }
}
export default useOpenedFolderInfo;
