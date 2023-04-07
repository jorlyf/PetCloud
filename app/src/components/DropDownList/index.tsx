import ToolTip from "@components/ToolTip";
import * as React from "react";

import styles from "./index.module.scss";

export interface DropDownListElement {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  label?: string;
  iconSrc?: string;
  disabled?: boolean;
  disabledLabel?: string;
}

export interface DropDownListProps {
  items: DropDownListElement[];
}

const DropDownList: React.FC<DropDownListProps> = ({ items }) => {
  return (
    <div className={styles.DropDownList}>
      <div className={styles.ItemList}>
        {items.map((item, ind) => (
          !item.disabled ?
            <div key={ind}
              onClick={item.onClick}
              onMouseEnter={item.onMouseEnter}
              onMouseLeave={item.onMouseLeave}
              className={styles.Item}
              style={{ cursor: item.onClick ? "pointer" : "auto" }}
            >
              {item.iconSrc && <img src={item.iconSrc} />}
              {item.label && <span>{item.label}</span>}
            </div>
            :
            <ToolTip key={ind} text={item.disabledLabel}>
              <div key={ind}
                className={styles.Item + " " + styles.Disabled}
              >
                {item.iconSrc && <img src={item.iconSrc} />}
                {item.label && <span>{item.label}</span>}
              </div>
            </ToolTip>
        ))}
      </div>
    </div>
  )
}
export default DropDownList;
