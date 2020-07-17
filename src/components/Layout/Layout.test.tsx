import React from "react";
import { RenderResult } from "@testing-library/react";

import { Layout } from "./Layout";
import { renderWithProviders } from "../../utils/testUtils";

describe("Layout tests", () => {
  const setup = (): RenderResult =>
    renderWithProviders(
      <Layout>
        <div>I'm a child</div>
      </Layout>
    );
  it("renders", () => {
    const { baseElement } = setup();
    expect(baseElement).toMatchSnapshot();
  });
});
