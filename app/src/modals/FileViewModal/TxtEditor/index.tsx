import * as React from "react";
import useTxtEditor from "./useTxtEditor";

import styles from "./index.module.scss";

const TxtEditor: React.FC = () => {
  const {
    text,
    setText
  } = useTxtEditor();

  return (
    <div className={styles.TxtEditor}>
      <textarea
        value={text}
        onChange={setText}
      />
    </div>
  )
}
export default TxtEditor;
