import * as React from "react";
import useHomeProgressBar from "./useHomeProgressBar";

import styles from "./index.module.scss";

const HomeProgressBar: React.FC = () => {

  const {
    loading,
    progress
  } = useHomeProgressBar();

  return (
    <div className={styles.HomeProgressBar}>
      {loading &&
        <div className={styles.Progress}>
          <span>Загрузка файлов</span>
          <progress max={1} value={progress} />
        </div>
      }
    </div >
  )
}
export default HomeProgressBar; 