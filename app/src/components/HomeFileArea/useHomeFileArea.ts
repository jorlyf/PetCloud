import * as React from "react";
import Vector2 from "@entities/common/Vector2";
import useAppSelector from "@hooks/useAppSelector";

const useHomeFileArea = () => {
  const [isOpenContextMenu, setIsOpenContextMenu] = React.useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = React.useState<Vector2 | null>(null);

  const openedFolder = useAppSelector(state => state.file.openedFolder);

  const handleOpenContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpenContextMenu(true);
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
  }

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpenContextMenu(false);
    setContextMenuPosition(null);
  }

  return {
    openedFolder,
    isOpenContextMenu,
    contextMenuPosition,
    handleOpenContextMenu,
    handleBackgroundClick
  }
}
export default useHomeFileArea;
