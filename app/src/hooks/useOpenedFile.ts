import * as React from "react";
import { findFileById } from "@redux/slices/hierarchy";
import useAppSelector from "@hooks/useAppSelector";
import FileModel from "@entities/file/FileModel";

const useOpenedFile = (): FileModel | null => {
  const rootFolder = useAppSelector(state => state.hierarchy.rootFolder);
  const openedFileId = useAppSelector(state => state.hierarchy.openedFileId);

  const [openedFile, setOpenedFile] = React.useState<FileModel | null>(null);

  React.useEffect(() => {
    setOpenedFile(findFileById(rootFolder, openedFileId));
  }, [rootFolder, openedFileId]);

  return openedFile;
}
export default useOpenedFile;
