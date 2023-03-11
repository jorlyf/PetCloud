import * as React from "react";
import { setRootFolder } from "@redux/slices/file";
import FolderModel from "@entities/file/FolderModel";
import useAppDispatch from "@hooks/useAppDispatch";
import useOpenedFolder from "@hooks/useOpenedFolder";

const rootFolder: FolderModel = {
  name: "Root",
  path: "Root",
  isRoot: true,
  parentPath: null,
  childFiles: [],
  childFolders: []
}

const useFolderHierarchy = () => {
  const dispatch = useAppDispatch();

  const openedFolder = useOpenedFolder();

  React.useEffect(() => { // init empty root folder
    dispatch(setRootFolder(rootFolder));
  }, []);

  return {
    openedFolder
  }
}
export default useFolderHierarchy;
