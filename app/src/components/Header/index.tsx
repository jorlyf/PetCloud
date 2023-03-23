import * as React from "react";
import useHeader from "./useHeader";
import DropDownList from "@components/DropDownList";

import styles from "./index.module.scss";

const Header: React.FC = () => {

  const {
    isActiveDropDownList,
    handleClickDropDownList,
    dropDownMenuItems
  } = useHeader();

  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>
        <h1>Pet Cloud</h1>
        <img src="/images/Cloud.png" />
      </div>
      <div className={styles.Profile}>
        <div className={styles.Avatar}>
          <img src="/images/TestAvatar.png" />
        </div>
        <div className={styles.ArrowMenu}>
          <img onClick={handleClickDropDownList} src="/images/ArrowDown.png" />
          {isActiveDropDownList && <DropDownList items={dropDownMenuItems} />}
        </div>
      </div>
    </div>
  )
}
export default Header;
