import React from "react";
import { render } from "react-testing-library";
import TypeTag from ".";

describe("<TypeTag />", (): void => {
  it("renders with ELECTRIC type", (): void => {
    const { queryByText } = render(<TypeTag type="electric">Electric</TypeTag>);

    expect(queryByText(/Electric/i)).toBeTruthy();
  });

  it("renders with PSYCHIC type", (): void => {
    const { queryByText } = render(<TypeTag type="psychic">Psychic</TypeTag>);

    expect(queryByText(/Psychic/i)).toBeTruthy();
  });
});
