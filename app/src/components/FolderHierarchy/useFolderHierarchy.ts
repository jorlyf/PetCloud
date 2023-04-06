import * as React from "react";
import { retrieveFolder, retrieveRootFolder, setRootFolder } from "@redux/slices/hierarchy";
import FolderModel from "@entities/file/FolderModel";
import useAppDispatch from "@hooks/useAppDispatch";
import useOpenedFolder from "@hooks/useOpenedFolder";
import useAppSelector from "@hooks/useAppSelector";

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
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);

  React.useEffect(() => { // init empty root folder
    //dispatch(setRootFolder(rootFolder));
  }, []);

  React.useEffect(() => {
    if (isAuthorized) dispatch(retrieveRootFolder());
  }, [isAuthorized]);

  React.useEffect(() => {
    if (!openedFolder) return;
    dispatch(retrieveFolder(openedFolder.id));
  }, [openedFolder]);

  return {
    openedFolder
  }
}
export default useFolderHierarchy;
