import useAppDispatch from "@hooks/useAppDispatch";
import useOpenedFolder from "@hooks/useOpenedFolder";

const useHomeFileArea = () => {
  const dispatch = useAppDispatch();

  const openedFolder = useOpenedFolder();

  return {
    openedFolder
  }
}
export default useHomeFileArea;
