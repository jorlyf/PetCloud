import * as React from "react";
import { findFolderByPath } from "@redux/slices/file";
import useAppSelector from "@hooks/useAppSelector";
import FolderModel from "@entities/file/FolderModel";

const useOpenedFolder = (): FolderModel | null => {
  const rootFolder = useAppSelector(state => state.file.rootFolder);
  const openedFolderPath = useAppSelector(state => state.file.openedFolderPath);

  const [openedFolder, setOpenedFolder] = React.useState<FolderModel | null>(null);

  React.useMemo(() => {
    setOpenedFolder(findFolderByPath(rootFolder, openedFolderPath));
  }, [rootFolder, openedFolderPath]);

  return openedFolder;
}
export default useOpenedFolder;
