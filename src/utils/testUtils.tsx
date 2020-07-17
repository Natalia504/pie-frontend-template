import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render, RenderResult, RenderOptions } from "@testing-library/react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { pieLightTheme } from "@pie/components";

const mockState = {
  counter: 0
};

export const mockStore = configureMockStore()(mockState);

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult =>
  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={createMuiTheme(pieLightTheme)}>{ui}</ThemeProvider>
    </Provider>
  );
