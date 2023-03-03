import * as React from "react";
import HomeFileArea from "@components/HomeFileArea";
import HomeLeftColumn from "@components/HomeLeftColumn";

import styles from "./index.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.Home}>
      <HomeLeftColumn />
      <HomeFileArea />
    </div>
  )
}
export default Home;
