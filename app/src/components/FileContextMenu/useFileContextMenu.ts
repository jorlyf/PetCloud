import * as React from "react";
import useAppSelector from "@hooks/useAppSelector";

const useFileContextMenu = () => {
  const selectedFilePath = useAppSelector(state => state.file.selectedFilePathContextMenu);

  React.useEffect(() => {

  });

  return {
    
  }
}
export default useFileContextMenu;
