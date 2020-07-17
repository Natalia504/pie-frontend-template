import React, { useEffect } from "react";

import { Layout } from "./components/Layout";
import { withMicroUI } from "@pie/components";
import { Home } from "./pages/Home";
import { appName } from "./utils/constants";
import { createRootReducer } from "./store/root/rootReducer";
import rootSaga from "./store/root/rootSaga";

const App: React.FC = () => {
  // TODO: Remove this. Just to POC useEffect and fetch
  useEffect(() => {
    // Must use Absolute path for fetch, otherwise it will prepend /microui
    fetch("/absolutepath");
  }, []);
  return (
    <Layout header="Frontend Template">
      <Home />
    </Layout>
  );
};

export default withMicroUI({
  // @ts-ignore
  rootReducer: createRootReducer(),
  rootSaga: rootSaga,
  appName
})(App);
