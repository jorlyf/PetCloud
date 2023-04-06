import * as React from "react";
import useDownloadInfoModal from "./useDownloadInfoModal";
import { IDownloadItem } from "@redux/slices/hierarchyDownloader";

import styles from "./index.module.scss";

const DownloadInfoModal: React.FC = () => {
  const {
    items,
    handleCancelItem
  } = useDownloadInfoModal();

  const getStatusSpan = (item: IDownloadItem) => {
    if (item.loaded)
      return <img src="/images/Success.png" width={20} height={20} />
    else if (item.error)
      return <img src="/images/Fail.png" width={20} height={20} />
    else
      return <span>{Math.round(item.progress * 100)}%</span>
  }

  return (
    <div className={styles.DownloadInfoModal}>
      {items.map(item => (
        <div key={item.id} className={styles.DownloadItem}>
          <div className={styles.Progress}>{getStatusSpan(item)}</div>
          <span className={styles.Name}>{item.name}</span>
          <img src="/images/Cancel.png" onClick={() => handleCancelItem(item)} className={styles.CancelButton} />
        </div>
      ))}
    </div>
  )
}
export default DownloadInfoModal;
