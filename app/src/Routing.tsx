import * as React from "react";
import { Route, Routes } from "react-router";
import Home from "@pages/Home";
import Auth from "@pages/Auth";
import NotFound from "@pages/NotFound";

export enum RoutingURL {
  home = "/",
  authorization = "/authorization",
  profile = "/profile"
}

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Auth />} path={RoutingURL.authorization} />
      {/* <Route element={<Profile />} path="/profile" /> */}
      <Route element={<NotFound />} path="*" />
    </Routes>
  )
}
export default Routing;
