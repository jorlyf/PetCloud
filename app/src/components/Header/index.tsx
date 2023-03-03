import * as React from "react";

import styles from "./index.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.Profile}>
        <div className={styles.Avatar}>
          <img src="/images/TestAvatar.png" />
        </div>
        <div className={styles.ArrowMenu}>
          <img src="/images/ArrowDown.png" />
        </div>
      </div>
    </div>
  )
}
export default Header;
