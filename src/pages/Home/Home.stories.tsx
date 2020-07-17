import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { Provider } from "react-redux";

import { Home } from "./Home";
import { mockStore } from "../../utils/testUtils";

storiesOf("Home", module)
  .addDecorator(withA11y)
  .addDecorator(withKnobs)
  .add("Kitchen Sink", () => (
    <Provider store={mockStore}>
      <Home />
    </Provider>
  ));
