import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { Typography } from "@material-ui/core";

import { Layout } from "./Layout";

storiesOf("Layout", module)
  .addDecorator(withA11y)
  .addDecorator(withKnobs)
  .add("Kitchen Sink", () => {
    const header = text("Header", "Test Header");
    return (
      <Layout {...{ header }}>
        <Typography variant="body2" color="textSecondary">
          Layout Story
        </Typography>
      </Layout>
    );
  });
