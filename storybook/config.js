import { configure, addDecorator, addParameters } from "@storybook/react";
import { pieLightTheme } from "@pie/components";

import withMuiTheme from "./addons/theme-addon";

const req = require.context("../src", true, /\.stories\.tsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}
addDecorator(withMuiTheme);
addParameters({ themeParameter: [pieLightTheme] });
configure(loadStories, module);
