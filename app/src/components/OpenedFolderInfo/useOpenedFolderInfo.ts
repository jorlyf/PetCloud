import useOpenedFolder from "@hooks/useOpenedFolder";

const useOpenedFolderInfo = () => {
  const openedFolder = useOpenedFolder();

  return {
    openedFolder
  }
}
export default useOpenedFolderInfo;
