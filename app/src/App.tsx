import * as React from "react";
import useAuthorization from "@hooks/useAuthorization";
import Header from "@components/Header/index";
import Modals from "@modals/Modals";
import Routing from "./Routing";

import styles from "./App.module.scss";

const App: React.FC = () => {
  useAuthorization();

  return (
    <>
      <div className={styles.App}>
        <Header />
        <Routing />
      </div>
      <Modals />
    </>
  )
}
export default App;
