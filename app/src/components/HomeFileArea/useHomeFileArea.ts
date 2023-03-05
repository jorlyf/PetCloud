import * as React from "react";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";

const useHomeFileArea = () => {
  const dispatch = useAppDispatch();

  const openedFolder = useAppSelector(state => state.file.openedFolder);

  return {
    openedFolder
  }
}
export default useHomeFileArea;
