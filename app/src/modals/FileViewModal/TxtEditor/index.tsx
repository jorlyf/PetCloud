import * as React from "react";
import useTxtEditor from "./useTxtEditor";

import styles from "./index.module.scss";

const TxtEditor: React.FC = () => {
  const {
    text,
    setText,
    handleSaveText
  } = useTxtEditor();

  return (
    <div className={styles.TxtEditor}>
      <textarea
        value={text}
        onChange={setText}
      />
      <div className={styles.Buttons}>
        <button onClick={handleSaveText}>Сохранить</button>
      </div>
    </div>
  )
}
export default TxtEditor;
