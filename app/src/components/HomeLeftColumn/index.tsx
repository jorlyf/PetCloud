import * as React from "react";
import FolderHierarchy from "@components/FolderHierarchy";

import styles from "./index.module.scss";

const HomeLeftColumn: React.FC = () => {
  return (
    <div className={styles.HomeLeftColumn}>
      <FolderHierarchy />
    </div>
  )
}
export default HomeLeftColumn;
