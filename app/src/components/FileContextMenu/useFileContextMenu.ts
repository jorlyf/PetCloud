import * as React from "react";
import { closeFileContextMenu, findFileById, openFile } from "@redux/slices/file";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";

const useFileContextMenu = () => {
  const dispatch = useAppDispatch();

  const rootFolder = useAppSelector(state => state.file.rootFolder);
  const contextMenuSelectedFileId = useAppSelector(state => state.file.contextMenuSelectedFileId);

  const selectedFile = React.useMemo(() => {
    return findFileById(rootFolder, contextMenuSelectedFileId);
  }, [rootFolder, contextMenuSelectedFileId]);

  const handleOpenFile = () => {
    if (selectedFile !== null)
      dispatch(openFile(selectedFile));
    dispatch(closeFileContextMenu());
  }

  return {
    handleOpenFile
  }
}
export default useFileContextMenu;
