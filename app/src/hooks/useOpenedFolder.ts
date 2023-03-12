import * as React from "react";
import { findFolderById } from "@redux/slices/file";
import useAppSelector from "@hooks/useAppSelector";
import FolderModel from "@entities/file/FolderModel";

const useOpenedFolder = (): FolderModel | null => {
  const rootFolder = useAppSelector(state => state.file.rootFolder);
  const openedFolderId = useAppSelector(state => state.file.openedFolderId);

  const [openedFolder, setOpenedFolder] = React.useState<FolderModel | null>(null);

  React.useMemo(() => {
    setOpenedFolder(findFolderById(rootFolder, openedFolderId));
  }, [rootFolder, openedFolderId]);

  return openedFolder;
}
export default useOpenedFolder;
