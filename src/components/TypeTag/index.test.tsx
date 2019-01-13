import React from "react";
// tslint:disable-next-line:no-implicit-dependencies
import { render } from "react-testing-library";
import TypeTag from "./";

describe("<TypeTag />", () => {
  it("renders with ELECTRIC type", () => {
    const { queryByText } = render(<TypeTag type="ELECTRIC">ELECTRIC</TypeTag>);

    expect(queryByText(/Electric/i)).toBeTruthy();
  });

  it("renders with PSYCHIC type", () => {
    const { queryByText } = render(<TypeTag type="PSYCHIC">PSYCHIC</TypeTag>);

    expect(queryByText(/Psychic/i)).toBeTruthy();
  });
});
