import * as React from "react";
import { loadRootFolder, setRootFolder } from "@redux/slices/file";
import FolderModel from "@entities/file/FolderModel";
import useAppDispatch from "@hooks/useAppDispatch";
import useOpenedFolder from "@hooks/useOpenedFolder";

const rootFolder: FolderModel = {
  id: "",
  parentId: null,
  name: "Root",
  path: "Root",
  isRoot: true,
  childFolders: [],
  files: []
}

const useFolderHierarchy = () => {
  const dispatch = useAppDispatch();

  const openedFolder = useOpenedFolder();

  React.useEffect(() => { // init empty root folder
    dispatch(setRootFolder(rootFolder));
    dispatch(loadRootFolder());
  }, []);

  return {
    openedFolder
  }
}
export default useFolderHierarchy;
