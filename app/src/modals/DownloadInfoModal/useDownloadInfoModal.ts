import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { abortDownloadItem, IDownloadItem, removeDownloadItem } from "@redux/slices/downloader";

const useDownloadInfoModal = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector(state => state.downloader.items);

  const handleCancelItem = (item: IDownloadItem) => {
    if (item.loaded)
      dispatch(removeDownloadItem(item.id));
    else
      dispatch(abortDownloadItem(item.id));
  }

  return {
    items,
    handleCancelItem
  }
}
export default useDownloadInfoModal;
