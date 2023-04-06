import * as React from "react";
import { findFolderById } from "@redux/slices/hierarchy";
import useAppSelector from "@hooks/useAppSelector";
import FolderModel from "@entities/file/FolderModel";

const useOpenedFolder = (): FolderModel | null => {
  const rootFolder = useAppSelector(state => state.hierarchy.rootFolder);
  const openedFolderId = useAppSelector(state => state.hierarchy.openedFolderId);

  const [openedFolder, setOpenedFolder] = React.useState<FolderModel | null>(null);

  React.useEffect(() => {
    setOpenedFolder(findFolderById(rootFolder, openedFolderId));
  }, [rootFolder, openedFolderId]);

  return openedFolder;
}
export default useOpenedFolder;
