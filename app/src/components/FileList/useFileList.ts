import * as React from "react";
import { closeFileAreaContexteMenu, closeFileContextMenu, openFileAreaContextMenu, openFileContextMenu } from "@redux/slices/hierarchy";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";

const useFileList = (fileListDivRef: React.MutableRefObject<HTMLDivElement>) => {
  const dispatch = useAppDispatch();

  const isOpenFileContextMenu = useAppSelector(state => state.hierarchy.isOpenFileContextMenu);
  const fileContextMenuPosition = useAppSelector(state => state.hierarchy.fileContextMenuPosition);
  const isOpenFileAreaContextMenu = useAppSelector(state => state.hierarchy.isOpenFileAreaContextMenu);
  const fileAreaContextMenuPosition = useAppSelector(state => state.hierarchy.fileAreaContextMenuPosition);

  const handleOpenFileContextMenu = (e: React.MouseEvent<HTMLDivElement>, fileId: string) => {
    e.preventDefault();
    dispatch(openFileContextMenu({ fileId, position: { x: e.pageX, y: e.pageY } }));
  }
  const handleCloseFileContextMenu = () => {
    dispatch(closeFileContextMenu());
  }
  const handleOpenFileAreaContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (fileListDivRef.current && e.target === fileListDivRef.current) {
      dispatch(openFileAreaContextMenu({ x: e.pageX, y: e.pageY }));
    }
  }
  const handleCloseFileAreaContextMenu = () => {
    dispatch(closeFileAreaContexteMenu());
  }

  return {
    isOpenFileContextMenu,
    fileContextMenuPosition,
    isOpenFileAreaContextMenu,
    fileAreaContextMenuPosition,
    handleOpenFileContextMenu,
    handleCloseFileContextMenu,
    handleOpenFileAreaContextMenu,
    handleCloseFileAreaContextMenu
  }
}
export default useFileList;
