import * as React from "react";
import { retrieveFolder, retrieveRootFolder } from "@redux/slices/hierarchy";
import useAppDispatch from "@hooks/useAppDispatch";
import useOpenedFolder from "@hooks/useOpenedFolder";
import useAppSelector from "@hooks/useAppSelector";

// const rootFolder: FolderModel = {
//   id: "",
//   parentId: null,
//   name: "Root",
//   path: "Root",
//   isRoot: true,
//   childFolders: [],
//   files: []
// }

const useFolderHierarchy = () => {
  const dispatch = useAppDispatch();

  const onSelectedFolder = (folderId: string) => {
    dispatch(retrieveFolder(folderId));
  }

  const openedFolder = useOpenedFolder(onSelectedFolder);
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);

  // React.useEffect(() => { // init empty root folder
  //   //dispatch(setRootFolder(rootFolder));
  // }, []);

  React.useEffect(() => {
    if (isAuthorized) dispatch(retrieveRootFolder());
  }, [isAuthorized]);

  return {
    openedFolder
  }
}
export default useFolderHierarchy;
