import React, { useState } from "react";
import { addons, makeDecorator } from "@storybook/addons";
import { ThemeProvider } from "@material-ui/styles";

import { THEME_CHANGE_EVENT } from "./register";
import { createMuiTheme } from "@material-ui/core";

const ThemesWrapper = ({ themes, children }) => {
  const [currTheme, setCurrTheme] = useState(themes[Object.keys(themes)[0]]);
  const channel = addons.getChannel();
  channel.on(THEME_CHANGE_EVENT, newTheme => setCurrTheme(newTheme));
  return (
    <div
      style={{
        backgroundColor:
          currTheme.palette && currTheme.palette.type === "dark" && "#212121",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={createMuiTheme(currTheme)}>
        {children}
      </ThemeProvider>
    </div>
  );
};

export default makeDecorator({
  name: "withMuiTheme",
  parameterName: "themeParameter",
  /* eslint-disable-next-line react/display-name */
  wrapper: (getStory, context, { parameters }) => (
    <ThemesWrapper themes={parameters}>{getStory(context)}</ThemesWrapper>
  ),
});
