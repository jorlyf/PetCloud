import * as React from "react";
import { findFileById } from "@redux/slices/file";
import useAppSelector from "@hooks/useAppSelector";
import FileModel from "@entities/file/FileModel";

const useOpenedFile = (): FileModel | null => {
  const rootFolder = useAppSelector(state => state.file.rootFolder);
  const openedFileId = useAppSelector(state => state.file.openedFileId);

  const [openedFile, setOpenedFile] = React.useState<FileModel | null>(null);

  React.useEffect(() => {
    setOpenedFile(findFileById(rootFolder, openedFileId));
  }, [rootFolder, openedFileId]);

  return openedFile;
}
export default useOpenedFile;
