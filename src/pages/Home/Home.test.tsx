import React from "react";
import { RenderResult } from "@testing-library/react";

import { Home } from "./Home";
import { renderWithProviders } from "../../utils/testUtils";

describe("Layout tests", () => {
  const setup = (): RenderResult => renderWithProviders(<Home />);
  it("renders", () => {
    const { baseElement } = setup();
    expect(baseElement).toMatchSnapshot();
  });
});
