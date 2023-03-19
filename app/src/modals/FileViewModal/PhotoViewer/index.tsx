import * as React from "react";
import usePhotoViewer from "./usePhotoViewer";

import styles from "./index.module.scss";

const PhotoViewer: React.FC = () => {

  const {
    imageSrc
  } = usePhotoViewer();

  return (
    <div className={styles.PhotoViewer}>
      <img src={imageSrc} />
    </div>
  )
}
export default PhotoViewer;
