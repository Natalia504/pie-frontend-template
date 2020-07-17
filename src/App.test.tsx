import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router";
import configureMockStore from "redux-mock-store";

import App from "./App";
import { Provider } from "react-redux";
import { mockState } from "./utils/testUtils";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <Provider store={configureMockStore()(mockState)}>
        <App />
      </Provider>
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
